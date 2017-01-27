import React, { Component } from 'react'
import './header.css'
import NavLink from '../NavLink'
const firebase = window.firebase

class MyHeader extends Component {
  constructor (props) {
    super(props)
    this.logout = this.logout.bind(this)
  }
  logout () {
    firebase.auth().signOut()
      .then(() => {
        this.context.router.push('/')
      })
  }
  
  render () {
    let logoutLink = this.props.loggedIn ? (<a href='#' className='logout headerLink' onClick={this.logout}>Logout</a>) : ''
    return (
      <header className='header'>
        <h1>
          <NavLink className='headerLink' to='/'>Money Tracker</NavLink>
          {logoutLink}
        </h1>
      </header>
    )
  }
}

MyHeader.propTypes = {
  loggedIn: React.PropTypes.bool
}

MyHeader.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default MyHeader
