import React, { Component } from 'react'
import PurchaseForm from './purchaseForm/purchaseForm'
import PurchaseList from './purchaseList/purchaseList'
const firebase = window.firebase

class Purchases extends Component {
  constructor (props) {
    super(props)
    this.state = { purchases: {} }
    this.addPurchase = this.addPurchase.bind(this)
    this.purchaseSubscription = firebase.database().ref('/purchases').on('value', snapshot => {
      let purchases = snapshot.val()
      this.setState({purchases})
    })
  }
  
  componentWillUnmount () {
    firebase.database().ref('/purchases').off('value', this.purchaseSubscription)
  }

  addPurchase (cost, type) {
    let purchaseRef = firebase.database().ref('/purchases/')
    let newPurchase = purchaseRef.push()
    newPurchase.set({cost, type})
  }

  render () {
    return (
      <div>
        <PurchaseForm addPurchase={this.addPurchase} />
        <PurchaseList purchases={this.state.purchases} />
      </div>
    )
  }
}

export default Purchases
