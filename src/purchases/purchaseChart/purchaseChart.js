import React, { Component } from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import './purchaseChart.css'

const weekInMilliseconds = 604800000

class PurchaseChart extends Component {
  state = { range: 'days' }

  setRange = (range) => {
    this.setState({range})
  }

  getDataByRange = (purchases, range) => {
    const purchasesArray = Object.values(purchases)
    const currentDate = (new Date(Date.now())).getTime()
    return this.formatPurchases(purchasesArray.filter(purchase => {
      if (range === 'days') {
        return currentDate - (new Date(purchase.date)).getTime() < weekInMilliseconds
      } else {
        return true
      }
    }), range)
  }

  formatPurchases = (purchases, range) => {
    const formattedPurchases = []
    const purchaseIndexHash = {}
    purchases.forEach((purchase) => {
      if (range === 'days') {
        const index = purchaseIndexHash[purchase.date]
        if (index != null) {
          formattedPurchases[index][purchase.type] = (formattedPurchases[index][purchase.type] || 0) + Number(purchase.cost)
        } else {
          const purchaseRow = { date: purchase.date }
          purchaseRow[purchase.type] = Number(purchase.cost)
          formattedPurchases.push(purchaseRow)
          purchaseIndexHash[purchase.date] = formattedPurchases.length - 1
        }
      }
    })
    formattedPurchases.sort((a, b) => {
      return (new Date(a.date)).getTime() - (new Date(b.date)).getTime()
    })
    return formattedPurchases
  }

  render () {
    const filteredPurchases = this.getDataByRange(this.props.purchases, this.state.range)

    return (
      <div>
        <ResponsiveContainer width='50%' height='80%' minHeight={300} minWidth={350}>
          <BarChart data={filteredPurchases}
            margin={{top: 20, right: 30, left: 20, bottom: 5}}>
            <XAxis dataKey='date' />
            <YAxis />
            <CartesianGrid strokeDasharray='3 3' />
            <Tooltip formatter={(value) => `$${value}`} />
            <Legend style={{marginTop: '10px'}} />
            <Bar dataKey='food' stackId='a' fill='#ffb3ba' />
            <Bar dataKey='gas' stackId='a' fill='#ffdfba' />
            <Bar dataKey='bills' stackId='a' fill='#baffc9' />
            <Bar dataKey='entertainment' stackId='a' fill='#bae1ff' />
          </BarChart>
        </ResponsiveContainer>
        <div className='buttonContainer'>
          <button onClick={() => { this.setRange('days') }}>Seven Days</button>
          <button onClick={() => { this.setRange('month') }}>Thirty Days</button>
          <button onClick={() => { this.setRange('year') }}>One Year</button>
        </div>
      </div>
    )
  }
}

PurchaseChart.propTypes = {
  purchases: React.PropTypes.object.isRequired
}

export default PurchaseChart
