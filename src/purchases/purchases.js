import React, { Component } from 'react'
import PurchaseForm from './purchaseForm/purchaseForm'
import PurchaseList from './purchaseList/purchaseList'
import { BarChart } from 'react-d3'
import './purchases.css'
const firebase = window.firebase

class Purchases extends Component {
  constructor (props) {
    super(props)
    this.state = { purchases: {} }
    this.addPurchase = this.addPurchase.bind(this)
    this.removePurchase = this.removePurchase.bind(this)
    this.updatePurchase = this.updatePurchase.bind(this)
    this.purchaseSubscription = firebase.database().ref(`${this.props.userId}/purchases/`).on('value', snapshot => {
      const purchases = snapshot.val() || {}
      this.setState({purchases})
    })
  }

  componentWillUnmount () {
    firebase.database().ref(`${this.props.userId}/purchases/`).off('value', this.purchaseSubscription)
  }

  formatPurchaseData (purchases) {
    const barData = [
      {
        'name': 'Series A',
        'values': [
          { 'x': 1, 'y': 91 },
          { 'x': 2, 'y': 73 }
        ]
      },
      {
        'name': 'Series B',
        'values': [
          { 'x': 1, 'y': 13 },
          { 'x': 2, 'y': 73 }
        ]
      }
    ]
    return barData
  }

  addPurchase (cost, type, date) {
    const purchaseRef = firebase.database().ref(`${this.props.userId}/purchases/`)
    const newPurchase = purchaseRef.push()
    newPurchase.set({cost, type, date})
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

  updatePurchase (cost, type, date, id) {
    const regex = /^\d+(\.|,)\d{2}$/
    if (!regex.test(cost)) return
    const purchase = {cost, type}
    firebase.database().ref(`${this.props.userId}/purchases/${id}`).update(purchase)
  }

  render () {
    const graphData = this.formatPurchaseData(this.state.purchases)
    return (
      <div>
        <PurchaseForm addPurchase={this.addPurchase} />
        <div className='flex-container'>
          <PurchaseList purchases={this.state.purchases}
            removePurchase={this.removePurchase} updatePurchase={this.updatePurchase} />
          <BarChart
            data={graphData}
            fill={'#3182bd'}
            title='Bar Chart'
            yAxisLabel='Cost'
            xAxisLabel='Date'
          />
        </div>
      </div>
    )
  }
}

Purchases.propTypes = {
  userId: React.PropTypes.string
}

export default Purchases
