import * as React from 'react'
import {render} from 'react-dom'
import * as configure from 'react-tap-event-plugin'
import {Router, Route, hashHistory} from 'react-router'
import {MuiThemeProvider, getMuiTheme, colors} from 'material-ui/styles'
import * as Firebase from 'firebase'
import './styles/main.scss'


import HomeView from './containers/views/HomeView.tsx'
import LoginView from './containers/views/LoginView.tsx'

configure()

// var config = {
  // apiKey: "AIzaSyDITQSs7-VAgODZc9EwCP02MJnLIjQzgy4",
  // authDomain: "yopta-7b8c0.firebaseapp.com",
  // databaseURL: "https://yopta-7b8c0.firebaseio.com",
  // storageBucket: "yopta-7b8c0.appspot.com",
// };
// Firebase.
// 
// Firebase.initializeApp(config);

console.log(Firebase)

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

render(<MuiThemeProvider muiTheme={theme}>
  <Router history={hashHistory}>
    <Route path='/' component={HomeView}/>
    <Route path='/login' component={LoginView}/>
  </Router>
</MuiThemeProvider>, container)