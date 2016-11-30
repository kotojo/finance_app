import React, { Component } from 'react'
const firebase = window.firebase

class PurchaseList extends Component {
  constructor (props) {
    super(props)
    this.state = { activePurchase: null, cost: null, type: null }
    this.setActive = this.setActive.bind(this)
    this.handleCostChange = this.handleCostChange.bind(this)
    this.updatePurchase = this.updatePurchase.bind(this)
  }

  handleCostChange (event) {
    let regex = /^\d+(\.|,)\d{2}$/
    this.setState({ cost: event.target.value,
      hasError: !regex.test(event.target.value) })
  }

  handleSelectChange (event) {
    this.setState({type: event.target.value})
  }

  updatePurchase () {
    let regex = /^\d+(\.|,)\d{2}$/
    if (!regex.test(this.state.cost)) return
    let purchase = {cost: this.state.cost, type: this.state.type}
    firebase.database().ref('/purchases/' + this.state.activePurchase).update(purchase)
    this.setState({ activePurchase: null, cost: null, type: null })
  }

  setActive (key) {
    if (key === undefined) this.setState({ activePurchase: null, cost: null, type: null })
    else {
      this.setState({activePurchase: key, cost: this.props.purchases[key].cost, type: this.props.purchases[key].type})
    }
  }

  render () {
    let purchases = Object.keys(this.props.purchases).map((key) => {
      if (key !== this.state.activePurchase) {
        return (
          <li key={key}>
            <span>{this.props.purchases[key].type}: {this.props.purchases[key].cost}</span>
            <button onClick={() => this.setActive(key)}>Edit</button>
          </li>
        )
      } else {
        return (
          <li key={key}>
            <select name='purchaseType' value={this.state.type}
              onChange={this.handleSelectChange}>
              <option value='food'>Food</option>
              <option value='gas'>Gas</option>
              <option value='bills'>Bills</option>
              <option value='entertainment'>Entertainment</option>
            </select>$
            <input onChange={this.handleCostChange} value={this.state.cost}
              type='text' name='purchaseCost' />
            <button onClick={this.updatePurchase}>Save</button>
            <button onClick={() => this.setActive()}>Cancel</button>
          </li>
        )
      }
    })

    return (
      <ul>{purchases}</ul>
    )
  }
}

PurchaseList.propTypes = {
  purchases: React.PropTypes.object
}

export default PurchaseList
