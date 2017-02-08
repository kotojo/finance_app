import React from 'react'
import { shallow } from 'enzyme'
import App from './App'

it('renders without crashing', () => {
  shallow(<App />)
})

it('sets user on initialization if available', () => {
  const wrapper = shallow(<App />)
  expect(wrapper.state().userId).toBe('1293xcvad91')
})

it('starts watcher for auth change on initialization', () => {
  const stateChangeSpy = jest.fn()
  global.firebase.auth = jest.fn().mockImplementation(() => {
    return {
      currentUser: {
        uid: '1293xcvad91'
      },
      onAuthStateChanged: stateChangeSpy
    }
  })
  shallow(<App />)
  expect(stateChangeSpy).toHaveBeenCalled()
})

it('adds userId prop to child components', () => {
  const child = <div id='child' />
  const wrapper = shallow(<App children={[child]} />)
  expect(wrapper.find('#child').first().props().userId).toBeDefined()
})

