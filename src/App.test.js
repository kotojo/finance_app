import React from 'react'
import { shallow } from 'enzyme'
import App from './App'
import {firebaseApp as firebase} from './firebase'
firebase.auth = jest.fn(() => {
  return { 
    currentUser: { uid: '1293xcvad91' },
    onAuthStateChanged: jest.fn()
  }
})

it('renders without crashing', () => {
  shallow(<App />)
})

it('sets user on initialization if available', () => {
  const wrapper = shallow(<App />)
  expect(wrapper.state().userId).toBe('1293xcvad91')
})

it('sets the user to null if no current user', () => {
  firebase.auth = jest.fn(() => {
    return { 
      currentUser: null,
      onAuthStateChanged: jest.fn()
    }
  })
  const wrapper = shallow(<App />)
  expect(wrapper.state().userId).toEqual(null)
})

it('starts watcher for auth change on initialization', () => {
  const stateChangeSpy = jest.fn()
  firebase.auth = jest.fn(() => {
    return { 
      currentUser: { uid: '1293xcvad91' },
      onAuthStateChanged: stateChangeSpy
    }
  })
  shallow(<App />)
  expect(stateChangeSpy).toHaveBeenCalled()
})

it('sets userId on auth state change', () => {
  let userCb
  firebase.auth = jest.fn(() => {
    return { 
      currentUser: null,
      onAuthStateChanged: jest.fn(cb => {
        userCb = cb
      })
    }
  })
  const wrapper = shallow(<App />)
  expect(wrapper.state().userId).toBe(null)
  userCb({uid: 'superCrazyHash'})
  expect(wrapper.state().userId).toEqual('superCrazyHash')
})

it('adds userId prop to child components', () => {
  const child = <div id='child' />
  const wrapper = shallow(<App children={[child]} />)
  expect(wrapper.find('#child').first().props().userId).toBeDefined()
})

