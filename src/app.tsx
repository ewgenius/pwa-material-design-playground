import * as React from 'react'
import {render} from 'react-dom'
import * as configure from 'react-tap-event-plugin'
import './styles/main.scss'

import {MuiThemeProvider} from 'material-ui/styles'

import App from './components/App.tsx'

configure()

const container = document.querySelector('#root')

render(<MuiThemeProvider>
  <App />
</MuiThemeProvider>, container)