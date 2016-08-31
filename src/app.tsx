import * as React from 'react'
import {render} from 'react-dom'
import * as configureTapEvent from 'react-tap-event-plugin'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import * as createLogger from 'redux-logger'
import {MuiThemeProvider, getMuiTheme, colors} from 'material-ui/styles'
import {FirebaseService} from './lib/firebase.ts'
import reducer from './store.ts'
import './styles/main.scss'

import routes from './routes.tsx'

configureTapEvent()

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

const loggerMiddleware = createLogger({ collapsed: true })
const firebaseMiddleware = firebase.middleware

const store = createStore(reducer, applyMiddleware(
  firebaseMiddleware,
  loggerMiddleware,
  thunkMiddleware
))

store.dispatch({
  type: 'INITIALIZE'
})

render(<Provider store={store}>
  <MuiThemeProvider muiTheme={theme}>
    {routes}
  </MuiThemeProvider>
</Provider>, container)