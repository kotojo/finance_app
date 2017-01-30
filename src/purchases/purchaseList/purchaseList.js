import React, { Component } from 'react'

class PurchaseList extends Component {
  constructor (props) {
    super(props)
    this.state = { activePurchase: null, cost: null, type: null }
    this.setActive = this.setActive.bind(this)
    this.handleCostChange = this.handleCostChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handlePurchaseUpdate = this.handlePurchaseUpdate.bind(this)
  }

  handleCostChange (event) {
    let regex = /^\d+(\.|,)\d{2}$/
    this.setState({ cost: event.target.value,
      hasError: !regex.test(event.target.value) })
  }

  handleSelectChange (event) {
    this.setState({type: event.target.value})
  }

  handlePurchaseUpdate () {
    this.props.updatePurchase(this.state.cost, this.state.type, this.state.activePurchase)
    this.setState({activePurchase: null})
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
            <button onClick={() => this.props.removePurchase(key)}>Delete</button>
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
            <button onClick={this.handlePurchaseUpdate}>Save</button>
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
  purchases: React.PropTypes.object,
  removePurchase: React.PropTypes.func,
  updatePurchase: React.PropTypes.func
}

export default PurchaseList
