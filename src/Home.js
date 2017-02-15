import React, { Component } from 'react'
import NavLink from './NavLink'

class Home extends Component {
  render () {
    const loginOrRegister = this.props.userId
      ? (<p>You are already logged in. Go to <NavLink to='purchases'>dashboard</NavLink>?</p>)
      : (<p>Please <NavLink to='login'>Login</NavLink> or <NavLink to='register'>Register</NavLink> to begin!</p>)

    return (
      <div style={{ textAlign: 'center' }}>
        <h2>A simple categorical breakdown of your finances</h2>
        {loginOrRegister}
      </div>)
  }
}

Home.propTypes = {
  userId: React.PropTypes.string
}

export default Home
