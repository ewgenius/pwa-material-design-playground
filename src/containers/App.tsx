import * as React from 'react'
import {Component} from 'react'
import {Dispatch} from 'redux'
import {connect} from 'react-redux'
import {push, goBack} from 'react-router-redux'
import {User} from 'firebase'
import {MuiThemeProvider, getMuiTheme, colors} from 'material-ui/styles'

import {AppState, AppUiState} from '../store.ts'
import {hidePrompt, showSidebar, hideSidebar} from '../actions/ui.ts'
import Flex from '../components/Layout/Flex.tsx'
import {Snackbar, Drawer, MenuItem} from 'material-ui'

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

function mapProps(state: { store: AppState }) {
  return {
    user: state.store.user,
    showSidebar: state.store.ui.showSidebar,
    showPrompt: state.store.ui.showPrompt,
    promptMessage: state.store.ui.promptMessage,
    promptAction: state.store.ui.promptAction,
    promptHandler: state.store.ui.promptHandler,
  }
}

interface AppProps {
  user: User
  showSidebar: boolean
  showPrompt: boolean
  promptMessage: string
  promptAction: string
  promptHandler: (any?) => any
  dispatch: Dispatch<any>
}

class App extends Component<AppProps, {}> {
  hidePrompt() {
    this.props.dispatch(hidePrompt())
  }

  toggleSidebar(open) {
    this.props.dispatch(open ? showSidebar() : hideSidebar())
  }

  navigateTo(path) {
    this.props.dispatch(push(path))
    this.toggleSidebar(false)
  }

  render() {
    const {showSidebar, showPrompt, promptMessage, promptAction, promptHandler} = this.props

    return <MuiThemeProvider muiTheme={theme}>

      <Flex>
        <Drawer
          open={showSidebar}
          docked={false}
          onRequestChange={open => this.toggleSidebar(open) }
          >
          <MenuItem onTouchTap={() => this.navigateTo('/settings') }>settings</MenuItem>
          <MenuItem onTouchTap={() => location.reload() }>reload</MenuItem>
        </Drawer>

        {this.props.children}

        <Snackbar
          open={showPrompt}
          message={promptMessage}
          autoHideDuration={4000}
          action={promptAction}
          onActionTouchTap={() => promptHandler() }
          onRequestClose={() => this.hidePrompt() }/>
      </Flex>
    </MuiThemeProvider>
  }
}

export default connect(mapProps)(App)