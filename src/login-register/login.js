import React, { Component } from 'react'
const firebase = window.firebase

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = { error: false, errorMessage: '', email: '', password: '' }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange (event) {
    const key = event.target.name
    let newState = {}
    newState[key] = event.target.value
    this.setState(newState)
  }
  handleSubmit (event) {
    event.preventDefault()

    const email = this.state.email
    const pass = this.state.password

    firebase.auth().signInWithEmailAndPassword(email, pass).then(res => {
      const { location } = this.props

      if (location.state && location.state.nextPathname) {
        this.props.router.replace(location.state.nextPathname)
      } else {
        this.props.router.replace('/purchases')
      }
    }, err => {
      let errorMessage
      const errorCode = err.code
      switch (errorCode) {
        case 'auth/invalid-email':
          errorMessage = 'This is not a valid email address.'
          break
        case 'auth/user-disabled':
          errorMessage = 'This user is disabled, sorry!'
          break
        case 'auth/user-not-found':
          errorMessage = 'No user found with that email address, sorry!'
          break
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password for the given email address.'
          break
        default:
          errorMessage = 'Sorry, something went wrong logging in. Please try again!'
      }
      this.setState({error: true, errorMessage})
    })
  }
  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor='email'>
          <input name='email' placeholder='email' type='text'
            value={this.state.email} onChange={this.handleChange} />
        </label>
        <label htmlFor='password'>
          <input name='password' placeholder='password' type='password'
            value={this.state.password} onChange={this.handleChange} />
        </label><br />
        <button type='submit'>login</button>
        {this.state.error && (<p>{this.state.errorMessage}</p>)}
      </form>
    )
  }
}

Login.propTypes = {
  location: React.PropTypes.object,
  router: React.PropTypes.object
}

export default Login
