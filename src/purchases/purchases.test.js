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

it('adds new purchases', () => {
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

it('removes purchases', () => {
  const refFn = jest.fn(() => {
    return {
      on: jest.fn(),
      push: jest.fn(),
      remove: rmFn,
      update: jest.fn()
    }
  })
  const rmFn = jest.fn(() => {
    return new Promise((resolve) => resolve())
  })
  firebase.database = jest.fn(() => {
    return { ref: refFn }
  })
  const wrapper = shallow(<Purchases userId='DarthVader' />)
  wrapper.instance().removePurchase(12)
  expect(refFn).toHaveBeenCalledWith('DarthVader/purchases/12')
  expect(rmFn).toHaveBeenCalled()
})

it('updates purchases', () => {
  const updateFn = jest.fn()
  const refFn = jest.fn((a, b, c, d) => {
    return {
      on: jest.fn(),
      push: jest.fn(),
      remove: jest.fn(),
      update: updateFn
    }
  })
  firebase.database = jest.fn(() => {
    return { ref: refFn }
  })
  const wrapper = shallow(<Purchases userId='DarthVader' />)
  wrapper.instance().updatePurchase('12.00', 'entertainment', '2017/02/02', 3) 
  expect(refFn).toHaveBeenCalledWith(`DarthVader/purchases/3`)
  expect(updateFn).toHaveBeenCalledWith({ cost: '12.00', type: 'entertainment', date: '2017/02/02' })
})