import * as React from 'react'
import {Provider} from 'react-redux'
import {Router, Route, hashHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import HomeView from './containers/views/HomeView.tsx'
import LoginView from './containers/views/LoginView.tsx'

export default function createRoutes(store) {
  const history = syncHistoryWithStore(hashHistory, store)
  return <Router history={history}>
    <Route path='/' component={HomeView}/>
    <Route path='/login' component={LoginView}/>
  </Router>
}