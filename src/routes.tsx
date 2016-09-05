import * as React from 'react'
import {Provider} from 'react-redux'
import {Router, Route, hashHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'

import App from './containers/App.tsx'
import HomeView from './containers/views/HomeView.tsx'
import LoginView from './containers/views/LoginView.tsx'
import SettingsView from './containers/views/SettingsView.tsx'

export default function createRoutes(store) {
  const history = syncHistoryWithStore(hashHistory, store)
  return <Router history={history}>
    <Route component={App}>
      <Route path='/' component={HomeView}/>
      <Route path='/login' component={LoginView}/>
      <Route path='/settings' component={SettingsView}/>
    </Route>
  </Router>
}