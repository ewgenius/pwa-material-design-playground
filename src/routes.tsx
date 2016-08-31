import * as React from 'react'
import {Provider} from 'react-redux'
import {Router, Route, hashHistory} from 'react-router'
import HomeView from './containers/views/HomeView.tsx'
import LoginView from './containers/views/LoginView.tsx'

export default <Router history={hashHistory}>
  <Route path='/' component={HomeView}/>
  <Route path='/login' component={LoginView}/>
</Router>