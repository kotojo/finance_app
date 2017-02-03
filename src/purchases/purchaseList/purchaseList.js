import React, { Component } from 'react'
import './purchaseList.css'

class PurchaseList extends Component {
  state = {
    activePurchase: null,
    cost: null,
    type: null,
    date: '',
    hasError: {
      cost: false,
      date: false
    }
  }

  handleCostChange = (event) => {
    let regex = /^\d+(\.|,)\d{2}$/
    this.setState({ cost: event.target.value,
      hasError: {
        cost: !regex.test(event.target.value),
        date: this.state.hasError.date
      }
    })
  }

  handleDateChange = (event) => {
    const validDate = this.isValidDate(event.target.value)
    this.setState({ date: event.target.value,
      hasError: { date: !validDate,
        cost: this.state.hasError.cost }
    })
  }

  isValidDate (dateStr) {
    if (dateStr == null) return false
    const date = new Date(dateStr)
    return date.getTime() > (new Date('1900-01-01')).getTime()
  }

  handleSelectChange = (event) => {
    this.setState({type: event.target.value})
  }

  handlePurchaseUpdate = () => {
    const { cost } = this.state.hasError
    const validDate = this.isValidDate(this.state.date)
    if (!validDate || cost) {
      this.setState({
        hasError: {
          date: !validDate,
          cost
        }
      })
      return
    }
    this.props.updatePurchase(this.state.cost, this.state.type, this.state.activePurchase, this.state.activePurchase)
    this.setState({activePurchase: null})
  }

  setActive = (key) => {
    if (key === undefined) this.setState({ activePurchase: null, cost: null, type: null })
    else {
      this.setState({activePurchase: key,
        cost: this.props.purchases[key].cost,
        type: this.props.purchases[key].type,
        date: this.props.purchases[key].date
      })
    }
  }

  render () {
    let purchases = Object.keys(this.props.purchases).map((key) => {
      if (key !== this.state.activePurchase) {
        return (
          <li key={key}>
            <span>{this.props.purchases[key].type}: {this.props.purchases[key].cost} - {this.props.purchases[key].date}</span>
            <button className='listItemBtn' onClick={() => this.setActive(key)}>Edit</button>
            <button className='listItemBtn' onClick={() => this.props.removePurchase(key)}>Delete</button>
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
              type='text' name='purchaseCost' className={this.state.hasError.cost ? 'error' : ''} />
            <input onChange={this.handleDateChange} value={this.state.date}
              type='date' name='purchaseDate' className={this.state.hasError.date ? 'error' : ''} />
            <button className='listItemBtn' onClick={this.handlePurchaseUpdate}>Save</button>
            <button className='listItemBtn' onClick={() => this.setActive()}>Cancel</button>
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
