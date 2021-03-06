import React, { Component } from 'react'
import PurchaseForm from './purchaseForm/purchaseForm'
import PurchaseList from './purchaseList/purchaseList'
import PurchaseChart from './purchaseChart/purchaseChart'
import './purchases.css'
import { firebaseApp as firebase } from '../firebase'

class Purchases extends Component {
  state = { purchases: {} }

  componentDidMount() {
      this.purchaseSubscription = firebase.database().ref(`${this.props.userId}/purchases/`).on('value', snapshot => {
        const purchases = snapshot.val() || {}
        this.setState({purchases})
    })
  }

  componentWillUnmount () {
    firebase.database().ref(`${this.props.userId}/purchases/`).off('value', this.purchaseSubscription)
  }

  addPurchase = (cost, type, date) => {
    const purchaseRef = firebase.database().ref(`${this.props.userId}/purchases/`)
    const newPurchase = purchaseRef.push()
    newPurchase.set({cost, type, date})
  }

  removePurchase = (key) => {
    const purchase = firebase.database().ref(`${this.props.userId}/purchases/${key}`)
    purchase.remove()
      .then(() => {
        console.log('Removed')
      }, () => {
        console.log('Error')
      })
  }

  updatePurchase = (cost, type, date, id) => {
    const regex = /^\d+(\.|,)\d{2}$/
    if (!regex.test(cost)) return
    const purchase = {cost, type, date}
    firebase.database().ref(`${this.props.userId}/purchases/${id}`).update(purchase)
  }

  render () {
    return (
      <div>
        <PurchaseForm addPurchase={this.addPurchase} />
        <div className='flex-container'>
          <PurchaseList purchases={this.state.purchases}
            removePurchase={this.removePurchase} updatePurchase={this.updatePurchase} />
          <PurchaseChart purchases={this.state.purchases} />
        </div>
      </div>
    )
  }
}

Purchases.propTypes = {
  userId: React.PropTypes.string
}

export default Purchases
