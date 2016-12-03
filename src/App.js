import React, { Component } from 'react'
import './App.css'
import MyHeader from './header/header.js'
import NavLink from './NavLink'
const firebase = window.firebase

class App extends Component {
  constructor (props) {
    super(props)
    const loggedIn = firebase.auth().currentUser != null
    this.state = { loggedIn }
  }

  componentWillMount () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({loggedIn: true})
      } else {
        this.setState({loggedIn: false})
      }
    })
  }

  render () {
    // todo: refactor two components
    const landingScreen = this.state.loggedIn ? <p>You are already logged in. Go to dashboard?</p>
      : (<p>You are not logged in. Please <NavLink to='login'>login</NavLink> or sign up.</p>)
    return (
      <div className='App'>
        <MyHeader />
        {this.props.children ? (this.props.children) : (landingScreen)}
      </div>
    )
  }
}

App.propTypes = {
  children: React.PropTypes.node
}

export default App
