import * as React from 'react'
import {render} from 'react-dom'
import * as configure from 'react-tap-event-plugin'
import {Provider} from 'react-redux'
import {Router, Route, hashHistory} from 'react-router'
import {MuiThemeProvider, getMuiTheme, colors} from 'material-ui/styles'
import {FirebaseService} from './lib/firebase.ts'
import './styles/main.scss'

import HomeView from './containers/views/HomeView.tsx'
import LoginView from './containers/views/LoginView.tsx'

configure()

const container = document.querySelector('#root')
const theme = getMuiTheme({
  palette: {
    primary1Color: colors.amber500,
    primary2Color: colors.amber500,
    primary3Color: colors.amber500,
    accent1Color: colors.deepOrangeA400,
    accent2Color: colors.deepOrangeA400,
    accent3Color: colors.deepOrangeA400
  },
  appBar: {
    height: 56
  }
})

const firebase = new FirebaseService({
  apiKey: "AIzaSyDITQSs7-VAgODZc9EwCP02MJnLIjQzgy4",
  authDomain: "yopta-7b8c0.firebaseapp.com",
  databaseURL: "https://yopta-7b8c0.firebaseio.com",
  storageBucket: "yopta-7b8c0.appspot.com",
})

if (!firebase.currentUser) firebase.sigIn()

render(<Provider>
  <MuiThemeProvider muiTheme={theme}>
    <Router history={hashHistory}>
      <Route path='/' component={HomeView}/>
      <Route path='/login' component={LoginView}/>
    </Router>
  </MuiThemeProvider>
</Provider>, container)