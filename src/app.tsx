import * as React from 'react'
import {render} from 'react-dom'
import * as configure from 'react-tap-event-plugin'
import {MuiThemeProvider, getMuiTheme, colors} from 'material-ui/styles'
import './styles/main.scss'

import App from './components/App.tsx'
import LoginView from './containers/views/LoginView.tsx'

configure()

const container = document.querySelector('#root')
const theme = getMuiTheme({
  palette: {
    primary1Color: colors.amber400,
    primary2Color: colors.amber400,
    primary3Color: colors.amber400,
    accent1Color: colors.deepOrangeA400,
    accent2Color: colors.deepOrangeA400,
    accent3Color: colors.deepOrangeA400
  },
  appBar: {
    height: 56
  }
})

render(<MuiThemeProvider muiTheme={theme}>
  <LoginView />
</MuiThemeProvider>, container)