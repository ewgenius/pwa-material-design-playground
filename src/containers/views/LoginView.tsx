import * as React from 'react'
import {Component} from 'react'
import {AppBar, FloatingActionButton} from 'material-ui'
import ContentAdd from 'material-ui/svg-icons/content/add'
import HeaderLayout from '../../components/Layout/HeaderLayout.tsx'

export default class App extends Component<{}, {}> {
  render() {
    return <HeaderLayout
      appBar={
        <AppBar title='login'/>
      }>
      <FloatingActionButton
        secondary={true}
        style={{
          position: 'fixed',
          right: 16,
          bottom: 16
        }}>
        <ContentAdd />
      </FloatingActionButton>
    </HeaderLayout>
  }
}