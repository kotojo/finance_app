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
    let logoutLink = this.props.userId ? (<a href='#' className='logoutLink headerLink' onClick={this.logout}>Logout</a>) : ''
    return (
      <div>
        <header className='header'>
          <h1>
            <NavLink className='headerLink' to='/'>Money Tracker</NavLink>
            {logoutLink}
          </h1>
        </header>
      </div>
    )
  }
}

MyHeader.propTypes = {
  userId: React.PropTypes.string
}

MyHeader.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default MyHeader
