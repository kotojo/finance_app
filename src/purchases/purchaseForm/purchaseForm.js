import React, { Component } from 'react'
import './purchaseForm.css'

class PurchaseForm extends Component {
  state = { cost: '0.00',
    type: 'food',
    date: '',
    hasError: { cost: false, date: false } }

  handleCostChange = (event) => {
    let regex = /^\d+(\.|,)\d{2}$/
    this.setState({ cost: event.target.value,
      hasError: { cost: !regex.test(event.target.value),
        date: this.state.hasError.date }
    })
  }

  handleDateChange = (event) => {
    const validDate = this.isValidDate(event.target.value)
    this.setState({ date: event.target.value,
      hasError: { date: !validDate,
        cost: this.state.hasError.cost }
    })
  }

  handleSelectChange = (event) => {
    this.setState({type: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const costRegex = /^\d+(\.|,)\d{2}$/
    if (!costRegex.test(this.state.cost) || !this.isValidDate(this.state.date)) return
    this.props.addPurchase(this.state.cost, this.state.type, this.state.date)
    this.setState({ cost: '0.00' })
  }

  isValidDate (dateStr) {
    if (dateStr == null) return false
    const date = new Date(dateStr)
    return date.getTime() > (new Date('1900-01-01')).getTime()
  }

  render () {
    // todo: factor out inputs into own components... get repetitive
    const dateClasses = (this.state.hasError.date ? 'error formInput' : 'formInput')
    const costClasses = (this.state.hasError.cost ? 'error formInput' : 'formInput')
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
              <label htmlFor='purchaseCost'><strong>Cost $</strong></label>
              <input type='text' name='purchaseCost' className={costClasses}
                value={this.state.cost} onChange={this.handleCostChange} />
            </div>
            <div className='formGroup'>
              <label htmlFor='purchaseDate'><strong>Date </strong></label>
              <input type='date' name='purchaseDate' className={dateClasses}
                value={this.state.date} onChange={this.handleDateChange} />
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
