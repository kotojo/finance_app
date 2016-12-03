import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import App from './App'
import Purchases from './purchases/purchases'
import Login from './login/login'
import './index.css'
const firebase = window.firebase

function requireAuth (nextState, replace, callback) {
  firebase.auth().onAuthStateChanged(user => {
    if (!user) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      })
    }
    callback()
  })
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <Route path='/purchases' component={Purchases} onEnter={requireAuth} />
      <Route path='/login' component={Login} />
    </Route>
  </Router>
  ), document.getElementById('root')
)
