import * as React from 'react'
import {Component} from 'react'
import {connect} from 'react-redux'

import {push} from 'react-router-redux'

import {AppBar, FloatingActionButton} from 'material-ui'
import ContentAdd from 'material-ui/svg-icons/content/add'
import HeaderLayout from '../../components/Layout/HeaderLayout.tsx'
import Scroller from '../../components/Layout/Scroller.tsx'

class HomeView extends Component<{dispatch: any}, {}> {
  render() {
    const appBar = <AppBar title='yopta'/>

    return <HeaderLayout
      appBar={appBar}>

      <Scroller>
        
      </Scroller>

      <FloatingActionButton onTouchTap={() => this.props.dispatch(push('/login'))}
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

export default connect()(HomeView)