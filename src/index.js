import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './App'
import Home from './Home'
import Purchases from './purchases/purchases'
import Login from './login-register/login'
import Register from './login-register/register'
import './index.css'
const firebase = window.firebase
let authSubscription

function requireAuth (nextState, replace, callback) {
  authSubscription = firebase.auth().onAuthStateChanged(user => {
    if (!user) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      })
    }
    callback()
    authSubscription()
  })
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='/purchases' component={Purchases} onEnter={requireAuth} />
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
    </Route>
  </Router>
  ), document.getElementById('root')
)
