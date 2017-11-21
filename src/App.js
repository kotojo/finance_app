import React, { Component } from 'react'
import './App.css'
import MyHeader from './header/header.js'
import { firebaseApp as firebase } from './firebase'

class App extends Component {
  constructor (props) {
    super(props)
    let userId = (firebase.auth().currentUser !== null) ? firebase.auth().currentUser.uid : null;
    this.state = { userId }
  }

  componentWillMount () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({userId: user.uid})
      } else {
        this.setState({userId: null})
      }
    })
  }

  render () {
    const children = React.Children.map(this.props.children,
      (child) => React.cloneElement(child, {
        userId: this.state.userId
      })
    )

    return (
      <div className='App'>
        <MyHeader userId={this.state.userId} />
        {children}
      </div>
    )
  }
}

App.propTypes = {
  children: React.PropTypes.node
}

export default App
