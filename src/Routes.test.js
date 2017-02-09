import React from 'react'
import { shallow } from 'enzyme'
import { firebaseApp as firebase } from './firebase'
import { Routes } from './Routes'
let authCb
firebase.auth = jest.fn(() => {
  return {
    onAuthStateChanged: jest.fn(cb => {
      authCb = cb
    })
  }
})

it('renders routes', () => {
  shallow(<Routes />)
})
