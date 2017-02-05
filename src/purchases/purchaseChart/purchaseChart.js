import React, { Component } from 'react'
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack } from 'victory'
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
    const formattedData = {
      'entertainment': [],
      'food': [],
      'bills': [],
      'gas': []
    }
    purchases.forEach((purchase) => {
      if (range === 'days') {
        let row = formattedData[purchase.type].find(row => {
          return row.date === purchase.date
        })
        if (row) {
          row.cost += purchase.cost
        } else {
          row = { date: purchase.date, cost: Number(purchase.cost) }
          formattedData[purchase.type].push(row)
        }
      }
    })
    for (let key of Object.keys(formattedData)) {
      if (formattedData[key].length === 0) {
        delete formattedData[key]
      }
    }
    return formattedData
  }

  getDateValues = (purchases) => {
    const purchaseDates = []
    for (let key of Object.keys(purchases)) {
      purchases[key].forEach(purchase => {
        console.log(purchase)
        if (purchaseDates.indexOf(purchase.date) === -1) {
          purchaseDates.push(purchase.date)
        }
      })
    }
    purchaseDates.sort((a, b) => {
      return (new Date(a)).getTime() - (new Date(b)).getTime()
    })
    return purchaseDates.map(purchase => {
      return purchase.substr(5)
    })
  }

  render () {
    const filteredPurchases = this.getDataByRange(this.props.purchases, this.state.range)
    return (
      <div>
        <VictoryChart domainPadding={20}
          theme={VictoryTheme.material} >
          <VictoryAxis tickValues={this.getDateValues(filteredPurchases)} />
          <VictoryAxis dependentAxis
            tickFormat={(x) => (`$${x}`)} />
          <VictoryStack>
            {Object.keys(filteredPurchases).map(key => {
              return <VictoryBar key={key}
                data={filteredPurchases[key]} x='date' y='cost' />
            })}
          </VictoryStack>
        </VictoryChart>
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
