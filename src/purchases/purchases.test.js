import React from 'react'
import { shallow } from 'enzyme'
import Purchases from './Purchases'
import {firebaseApp as firebase} from '../firebase'

it('renders without crashing', () => {
  shallow(<Purchases />)
})

it('initializes state', () => {
  const wrapper = shallow(<Purchases />)
  expect(wrapper.state()).toEqual({ purchases: {} })
})

it('subscribes to purchases on initialization', () => {
  let callbackFn
  const subscribeFn = jest.fn((val, fn) => callbackFn = fn)
  firebase.database = jest.fn(() => {
    return { ref: jest.fn(() => {
        return {
          on: subscribeFn,
          push: jest.fn(),
          remove: jest.fn(),
          update: jest.fn()
        }
      })
    }
  })
  shallow(<Purchases />)
  // todo: find out why expect.any isn't available
  expect(subscribeFn).toHaveBeenCalledWith('value', callbackFn)
})

it('can add new purchases', () => {
  const setFn = jest.fn()
  firebase.database = jest.fn(() => {
    return { ref: jest.fn(() => {
        return {
          on: jest.fn(),
          push: jest.fn(() => {
            return {set: setFn}
          }),
          remove: jest.fn(),
          update: jest.fn()
        }
      })
    }
  })
  const wrapper = shallow(<Purchases />)
  wrapper.instance().addPurchase(1.00, 'entertainment', '2017-01-01')
  expect(setFn).toHaveBeenCalledWith({cost: 1.00, type: 'entertainment', date: '2017-01-01'})
})