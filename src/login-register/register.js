import React, { Component } from 'react'
const firebase = window.firebase

class Register extends Component {
  constructor (props) {
    super(props)
    this.state = { error: '', email: '', password: '' }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    const updatedState = {}
    updatedState[event.target.name] = event.target.value
    this.setState(updatedState)
  }

  handleSubmit (event) {
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
    let errors = this.state.error ? <p>{this.state.error}</p> : ''
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor='email'> Email </label>
            <input name='email' placeholder='Email'
              value={this.state.email}
              onChange={this.handleChange} />
          </div>
          <div>
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