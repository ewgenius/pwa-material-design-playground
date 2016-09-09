import * as React from 'react'
import {render} from 'react-dom'
import * as configureTapEvent from 'react-tap-event-plugin'
import {combineReducers, createStore, applyMiddleware} from 'redux'
import {hashHistory} from 'react-router'
import {routerReducer, routerMiddleware} from 'react-router-redux'
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import * as createLogger from 'redux-logger'
import {FirebaseService, FIREBASE_DATABASE_ACTION, FIREBASE_AUTH_ACTION} from './lib/firebase.ts'
import * as Firebase from 'firebase'
import reducer from './store.ts'
import './styles/main.scss'

import {SIGN_IN_SUCCESS} from './actions/auth.ts'
import {showPrompt} from './actions/ui.ts'

import createRoutes from './routes.tsx'

configureTapEvent()

const container = document.querySelector('#root')

const firebase = new FirebaseService({
  apiKey: "AIzaSyDITQSs7-VAgODZc9EwCP02MJnLIjQzgy4",
  authDomain: "pwa-app-7b8c0.firebaseapp.com",
  databaseURL: "https://yopta-7b8c0.firebaseio.com",
  storageBucket: "yopta-7b8c0.appspot.com",
})

const loggerMiddleware = createLogger({ collapsed: true })
const firebaseMiddleware = firebase.middleware

declare const process: any
const middleware = process.env.NODE_ENV === 'development' ? applyMiddleware(
  routerMiddleware(hashHistory),
  firebaseMiddleware,
  thunkMiddleware,
  loggerMiddleware
) : applyMiddleware(
  routerMiddleware(hashHistory),
  firebaseMiddleware,
  thunkMiddleware
)

const store = createStore(combineReducers({
  store: reducer,
  routing: routerReducer
}), middleware)

firebase.authStateHanler = user => store.dispatch({
  type: SIGN_IN_SUCCESS,
  user
})

/**
 * init SW
 */

function updateReady(worker) {
  store.dispatch(showPrompt('New version is ready', 'reload', () => {
    worker.postMessage({ action: 'skipWaiting' })
  }))
}

function trackInstalling(worker) {
  worker.addEventListener('statechange', () => {
    updateReady(worker)
  })
}

if ((navigator as any).serviceWorker) {
  const serviceWorker = (navigator as any).serviceWorker
  serviceWorker.register('/sw.js')
    .then(reg => {
      if (!serviceWorker.controller) {
        return
      }

      if (reg.waiting) {
        updateReady(reg.waiting)
        return
      }

      if (reg.installing) {
        trackInstalling(reg.installing)
        return
      }

      reg.addEventListener('updatefound', () => {
        trackInstalling(reg.installing)
      })
    })

  let refreshing = false
  serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return
    window.location.reload()
    refreshing = true
  })
}

const routes = createRoutes(store)

render(<Provider store={store}>
  {routes}
</Provider>, container)