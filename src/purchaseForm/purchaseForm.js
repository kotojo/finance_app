import React, { Component } from 'react'
import './purchaseForm.css'

class PurchaseForm extends Component {
  constructor (props) {
    super(props)
    this.state = { cost: '0.00', type: 'food', hasError: false }

    this.handleCostChange = this.handleCostChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleCostChange (event) {
    let regex = /^\d+(\.|,)\d{2}$/
    this.setState({ cost: event.target.value,
      hasError: !regex.test(event.target.value) })
  }

  handleSelectChange (event) {
    this.setState({type: event.target.value})
  }

  handleSubmit (event) {
    event.preventDefault()
    let regex = /^\d+(\.|,)\d{2}$/
    if (!regex.test(this.state.cost)) return
    this.props.addPurchase(this.state.cost, this.state.type)
    this.setState({ cost: '0.00', type: 'food' })
  }

  render () {
    let inputClasses = (this.state.hasError ? 'costError' : '')
    return (
      <div className='purchaseContainer'>
        <div className='purchaseCard'>
          <div className='purchaseCardHeader'>
            <h2>Enter new purchases here.</h2>
          </div>
          <div className='purchaseCardBody'>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor='purchaseType'>Purchase Type:</label>
              <select name='purchaseType' value={this.state.value} onChange={this.handleSelectChange}>
                <option value='food'>Food</option>
                <option value='gas'>Gas</option>
                <option value='bills'>Bills</option>
                <option value='entertainment'>Entertainment</option>
              </select>
              <br />
              <label htmlFor='purchaseCost'>Cost: $</label>
              <input type='text' name='purchaseCost' className={inputClasses}
                value={this.state.cost} onChange={this.handleCostChange} />
              <br />
              <input type='submit' value='Submit' />
            </form>
          </div>
        </div>
      </div>
    )
  }
}

PurchaseForm.propTypes = {
  addPurchase: React.PropTypes.func
}

export default PurchaseForm
