import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './App'
import Home from './Home'
import Purchases from './purchases/purchases'
import Login from './login-register/login'
import Register from './login-register/register'
import './index.css'
import { firebaseApp as firebase } from './firebase'
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

export const Routes = () => (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='/purchases' component={Purchases} onEnter={requireAuth} />
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
    </Route>
  </Router>
)
