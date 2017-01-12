import React, { Component } from 'react'
import NavLink from './NavLink'

class Home extends Component {
  render () {
    const landingScreen = this.props.loggedIn
      ? (<p>You are already logged in. Go to <NavLink to='purchases'>dashboard</NavLink>?</p>)
      : (<p>You are not logged in. Please <NavLink to='login'>Login</NavLink> or <NavLink to='register'>Register</NavLink>.</p>)

    return (landingScreen)
  }
}

Home.propTypes = {
  loggedIn: React.PropTypes.bool
}

export default Home