import React, { Component } from 'react'
import './App.css'
import MyHeader from './header/header.js'
import PurchaseForm from './purchaseForm/purchaseForm.js'
import PurchaseList from './purchaseList/purchaseList.js'
const firebase = window.firebase

class App extends Component {
  constructor (props) {
    super(props)
    this.state = { purchases: {} }
    this.addPurchase = this.addPurchase.bind(this)
    firebase.database().ref('/purchases').on('value', snapshot => {
      let purchases = snapshot.val()
      this.setState({purchases})
    })
  }

  addPurchase (cost, type) {
    let purchaseRef = firebase.database().ref('/purchases/')
    let newPurchase = purchaseRef.push()
    newPurchase.set({cost, type})
  }

  render () {
    return (
      <div className='App'>
        <MyHeader />
        <div>
          <PurchaseForm addPurchase={this.addPurchase} />
          <PurchaseList purchases={this.state.purchases} />
        </div>
      </div>
    )
  }
}

export default App
