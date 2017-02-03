import React, { Component } from 'react'
import './login-register.css'
const firebase = window.firebase

class Register extends Component {
  state = { error: '', email: '', password: '' }

  handleChange = (event) => {
    const updatedState = {}
    updatedState[event.target.name] = event.target.value
    this.setState(updatedState)
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const email = this.state.email
    const pw = this.state.password

    firebase.auth().createUserWithEmailAndPassword(email, pw)
      .then(() => {
        this.context.router.replace('/purchases')
      })
      .catch((error) => {
        this.setState({error: error.message})
      })
  }

  render () {
    const errors = this.state.error ? <p>{this.state.error}</p> : ''
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className='formGroup'>
            <label htmlFor='email'> Email </label>
            <input name='email' placeholder='Email'
              value={this.state.email}
              onChange={this.handleChange} />
          </div>
          <div className='formGroup'>
            <label htmlFor='password'>Password</label>
            <input name='password' type='password' placeholder='Password'
              value={this.state.password}
              onChange={this.handleChange} />
          </div>
          {errors}
          <button type='submit'>Register</button>
        </form>
      </div>
    )
  }
}

Register.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Register
