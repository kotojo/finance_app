import React, { Component } from 'react'
import PurchaseForm from './purchaseForm/purchaseForm'
import PurchaseList from './purchaseList/purchaseList'
const firebase = window.firebase

class Purchases extends Component {
  constructor (props) {
    super(props)
    this.state = { purchases: {} }
    this.addPurchase = this.addPurchase.bind(this)
    this.removePurchase = this.removePurchase.bind(this)
    this.updatePurchase = this.updatePurchase.bind(this)
    this.purchaseSubscription = firebase.database().ref(`${this.props.userId}/purchases/`).on('value', snapshot => {
      let purchases = snapshot.val() || {}
      this.setState({purchases})
    })
  }

  componentWillUnmount () {
    firebase.database().ref(`${this.props.userId}/purchases/`).off('value', this.purchaseSubscription)
  }

  addPurchase (cost, type) {
    let purchaseRef = firebase.database().ref(`${this.props.userId}/purchases/`)
    let newPurchase = purchaseRef.push()
    newPurchase.set({cost, type})
  }

  removePurchase (key) {
    const purchase = firebase.database().ref(`${this.props.userId}/purchases/${key}`)
    purchase.remove()
      .then(() => {
        console.log('Removed')
      }, () => {
        console.log('Error')
      })
  }

  updatePurchase (cost, type, id) {
    let regex = /^\d+(\.|,)\d{2}$/
    if (!regex.test(cost)) return
    let purchase = {cost, type}
    firebase.database().ref(`${this.props.userId}/purchases/${id}`).update(purchase)
  }

  render () {
    return (
      <div>
        <PurchaseForm addPurchase={this.addPurchase} />
        <PurchaseList purchases={this.state.purchases} removePurchase={this.removePurchase}
          updatePurchase={this.updatePurchase} />
      </div>
    )
  }
}

Purchases.propTypes = {
  userId: React.PropTypes.string
}

export default Purchases
