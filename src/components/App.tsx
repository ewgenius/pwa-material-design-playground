import * as React from 'react'
import {Component} from 'react'
import {MuiThemeProvider} from 'material-ui/styles'
import {AppBar} from 'material-ui'

export default class App extends Component<{}, {}> {
  render() {
    return <MuiThemeProvider>
      <div>
        <AppBar title='Yopta'/>
      </div>
    </MuiThemeProvider>
  }
}