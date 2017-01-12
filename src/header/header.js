import React, { Component } from 'react'
import './header.css'
import NavLink from '../NavLink'

class MyHeader extends Component {
  render () {
    return (
      <header className='header'>
        <div>
          <h1>
            <NavLink className='menuLink' to='/'>Money Tracker</NavLink>
          </h1>
        </div>
      </header>
    )
  }
}

export default MyHeader
