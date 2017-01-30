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
    this.setState({ cost: '0.00' })
  }

  render () {
    let inputClasses = (this.state.hasError ? 'costError formInput' : 'formInput')
    return (
      <div>
        <h2>Add a purchase</h2>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div className='formGroup'>
              <label htmlFor='purchaseType'><strong>Purchase Type</strong></label>
              <select className='formInput' name='purchaseType'
                value={this.state.value} onChange={this.handleSelectChange}>
                <option value='food'>Food</option>
                <option value='gas'>Gas</option>
                <option value='bills'>Bills</option>
                <option value='entertainment'>Entertainment</option>
              </select>
            </div>
            <div className='formGroup'>
              <label htmlFor='purchaseCost'><strong>Cost: $</strong></label>
              <input type='text' name='purchaseCost' className={inputClasses}
                value={this.state.cost} onChange={this.handleCostChange} />
            </div>
            <input type='submit' value='Submit' className='formSubmit' />
          </form>
        </div>
      </div>
    )
  }
}

PurchaseForm.propTypes = {
  addPurchase: React.PropTypes.func
}

export default PurchaseForm
