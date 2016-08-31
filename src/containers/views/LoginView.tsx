import * as React from 'react'
import {Component} from 'react'
import {AppBar} from 'material-ui'
import HeaderLayout from '../../components/Layout/HeaderLayout.tsx'

export default class App extends Component<{}, {}> {
  render() {
    return <HeaderLayout
      appBar={
        <AppBar title='login'/>
      }>
      test
    </HeaderLayout>
  }
}