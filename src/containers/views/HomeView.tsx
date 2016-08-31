import * as React from 'react'
import {Component} from 'react'
import {AppBar, FloatingActionButton} from 'material-ui'
import ContentAdd from 'material-ui/svg-icons/content/add'
import HeaderLayout from '../../components/Layout/HeaderLayout.tsx'
import Scroller from '../../components/Layout/Scroller.tsx'

export default class HomeView extends Component<{}, {}> {
  render() {
    const appBar = <AppBar title='yopta'/>

    return <HeaderLayout
      appBar={appBar}>

      <Scroller>
        
      </Scroller>

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