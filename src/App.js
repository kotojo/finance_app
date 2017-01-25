import React, { Component } from 'react'
import './App.css'
import MyHeader from './header/header.js'
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
    const children = React.Children.map(this.props.children,
      (child) => React.cloneElement(child, {
        loggedIn: this.state.loggedIn
      })
    )
    
    return (
      <div className='App'>
        <MyHeader loggedIn={this.state.loggedIn} />
        {children}
      </div>
    )
  }
}

App.propTypes = {
  children: React.PropTypes.node
}

export default App
