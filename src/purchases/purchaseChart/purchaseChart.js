import React, { Component } from 'react'
import { VictoryBar, VictoryChart,
         VictoryAxis, VictoryTheme,
         VictoryStack, VictoryLegend } from 'victory'
import './purchaseChart.css'

const timeInMilliseconds = {
  'week': 604800000,
  'weeks': 2419200000
}

class PurchaseChart extends Component {
  state = { range: 'week' }

  setRange = (range) => {
    this.setState({range})
  }

  getDataByRange = (purchases, range) => {
    const purchasesArray = Object.values(purchases)
    const currentDate = (new Date()).getTime()
    return this.formatPurchases(purchasesArray.filter(purchase => {
      return currentDate - (new Date(purchase.date)).getTime() < timeInMilliseconds[range]
    }), range)
  }

  getEmptyRows = (range) => {
    const emptyRows = []
    const currentDate = new Date()
    if (range === 'week') {
      for (let i = 0; i < 7; i++) {
        const day = currentDate - 1000 * 60 * 60 * 24 * i
        emptyRows.push({cost: 0, date: (new Date(day)).toISOString().substr(0, 10)})
      }
    } else if (range === 'weeks') {
      for (let i = 1; i <= 4; i++) {
        const day = currentDate - 1000 * 60 * 60 * 24 * i * 7
        emptyRows.push({cost: 0, date: (new Date(day)).toISOString().substr(0, 10)})
      }
    }
    return emptyRows
  }

  formatPurchases = (purchases, range) => {
    const formattedData = {
      'entertainment': this.getEmptyRows(range),
      'food': this.getEmptyRows(range),
      'bills': this.getEmptyRows(range),
      'gas': this.getEmptyRows(range)
    }
    purchases.forEach((purchase) => {
      if (range === 'week') {
        let row = formattedData[purchase.type].find(row => {
          return row.date === purchase.date
        })
        row.cost += Number(purchase.cost)
      } else if (range === 'weeks') {
        let row = formattedData[purchase.type].find(row => {
          const rowStartDate = new Date(row.date)
          const purchaseDate = new Date(purchase.date)
          return rowStartDate <= purchaseDate &&
            purchaseDate < rowStartDate.setDate(rowStartDate.getDate() + 7)
        })
        row.cost += Number(purchase.cost)
      }
    })
    for (let key of Object.keys(formattedData)) {
      formattedData[key].sort((a, b) => {
        return new Date(a.date) > new Date(b.date)
      })
    }
    return formattedData
  }

  getDateValues = (purchases) => {
    const purchaseDates = []
    for (let key of Object.keys(purchases)) {
      purchases[key].forEach(purchase => {
        if (purchaseDates.indexOf(purchase.date) === -1) {
          purchaseDates.push(purchase.date)
        }
      })
    }
    purchaseDates.sort((a, b) => {
      return (new Date(a)).getTime() - (new Date(b)).getTime()
    })
    return purchaseDates
  }

  render () {
    const filteredPurchases = this.getDataByRange(this.props.purchases, this.state.range)
    const formattedDateValues = this.getDateValues(filteredPurchases).map(purchase => {
      return purchase.substr(5)
    })
    const legendData = [
      {
        name: 'Entertainment',
        symbol: {
          type: 'square',
          fill: '#ffb3ba'
        }
      },
      {
        name: 'Foo',
        symbol: {
          type: 'square',
          fill: '#ffdfba'
        }
      },
      {
        name: 'Bills',
        symbol: {
          type: 'square',
          fill: '#baffc9'
        }
      },
      {
        name: 'Gas',
        symbol: {
          type: 'square',
          fill: '#bae1ff'
        }
      }]
    return (
      <div>
        <VictoryChart domainPadding={20}
          theme={VictoryTheme.material} >
          <VictoryAxis tickValues={formattedDateValues} />
          <VictoryAxis dependentAxis
            tickFormat={(x) => (`$${x}`)} />
          <VictoryStack colorScale={['#ffb3ba', '#ffdfba', '#baffc9', '#bae1ff']}>
            {Object.keys(filteredPurchases).map(key => {
              return <VictoryBar key={key}
                data={filteredPurchases[key]}
                style={{
                  data: {width: 20}
                }}
                animate={{
                  onExit: {
                    duration: 500,
                    before: () => ({
                      y: 0
                    })
                  }
                }}
                x='date' y='cost' />
            })}
          </VictoryStack>
          <VictoryLegend data={legendData}
            orientation='horizontal' />
        </VictoryChart>
        <div className='buttonContainer'>
          <button onClick={() => { this.setRange('week') }}>Seven Days</button>
          <button onClick={() => { this.setRange('weeks') }}>Four Weeks</button>
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
