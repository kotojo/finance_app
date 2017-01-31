import React, { Component } from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import './purchaseChart.css'
const data = [
      {name: 'Sunday', Food: 4000, Gas: 2400, Bills: 2400, Entertainment: 3000},
      {name: 'Monday', Food: 3000, Gas: 1398, Bills: 2210, Entertainment: 1450},
      {name: 'Tuesday', Food: 2000, Gas: 9800, Bills: 2290, Entertainment: 1000},
      {name: 'Wednesday', Food: 2780, Gas: 3908, Bills: 2000, Entertainment: 4500},
      {name: 'Thursday', Food: 1890, Gas: 4800, Bills: 2181, Entertainment: 1200},
      {name: 'Friday', Food: 2390, Gas: 3800, Bills: 2500, Entertainment: 2750},
      {name: 'Saturday', Food: 2390, Gas: 3800, Bills: 2500, Entertainment: 2750}
]

class PurchaseChart extends Component {
  constructor (props) {
    super(props)
    this.state = { range: 'days' }
    this.setRange = this.setRange.bind(this)
  }

  setRange (range) {
    this.setState({range})
  }

  render () {
    return (
      <div>
        <ResponsiveContainer width='50%' height='80%' minHeight={300} minWidth={350}>
          <BarChart data={data}
            margin={{top: 20, right: 30, left: 20, bottom: 5}}>
            <XAxis dataKey='name' />
            <YAxis />
            <CartesianGrid strokeDasharray='3 3' />
            <Tooltip formatter={(value) => `$${value}`} />
            <Legend />
            <Bar dataKey='Food' stackId='a' fill='#ffb3ba' />
            <Bar dataKey='Gas' stackId='a' fill='#ffdfba' />
            <Bar dataKey='Bills' stackId='a' fill='#baffc9' />
            <Bar dataKey='Entertainment' stackId='a' fill='#bae1ff' />
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
