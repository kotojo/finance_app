import React, { Component } from 'react'
import './header.css'
import NavLink from '../NavLink'
import { firebaseApp as firebase } from '../firebase'

class MyHeader extends Component {
  
  static propTypes = {
    userId: React.PropTypes.string
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  logout = () => {
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
          </h1>
        </header>
        <nav>
          {logoutLink}
        </nav>
      </div>
    )
  }
}

export default MyHeader
