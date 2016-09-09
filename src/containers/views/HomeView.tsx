import * as React from 'react'
import {Component} from 'react'
import {Dispatch} from 'redux'
import {connect} from 'react-redux'

import {AppState} from '../../store.ts'
import {push} from 'react-router-redux'
import {showSidebar} from '../../actions/ui.ts'
import {requestOrders, createOrder} from '../../actions/orders.ts'
import * as Firebase from 'firebase'

import {AppBar, FloatingActionButton, CircularProgress, Card, CardHeader, CardText} from 'material-ui'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Flex from '../../components/Layout/Flex.tsx'
import HeaderLayout from '../../components/Layout/HeaderLayout.tsx'
import Scroller from '../../components/Layout/Scroller.tsx'

function mapProps(state: { store: AppState }): HomeViewProps {
  return {
    loading: state.store.orders.loading,
    items: state.store.orders.items
  }
}

interface HomeViewProps {
  loading?: boolean
  items?: any[]
  dispatch?: any
}

class HomeView extends Component<HomeViewProps, {}> {
  componentDidMount() {
    this.props.dispatch(requestOrders())
  }

  addOrder() {
    this.props.dispatch(createOrder({
      name: 'test',
      created: Firebase.database.ServerValue.TIMESTAMP
    }))
      .then(() => this.props.dispatch(requestOrders()))
  }

  render() {
    const {loading, items} = this.props

    const appBar = <AppBar onLeftIconButtonTouchTap={() => this.props.dispatch(showSidebar()) } title='pwa-app'/>

    return <HeaderLayout
      appBar={appBar}>

      {loading ?
        <Flex flow='row' alignItems='center' alignSelf='center'>
          <CircularProgress />
        </Flex>
        :
        <Scroller vertical>
          {items.map((item, i) => <Card key={i} style={{ margin: 8 }}>
            <CardHeader title={item.item.name}/>
            <CardText>
              {new Date(item.item.created).toString()}
            </CardText>
          </Card>) }
        </Scroller>}

      <FloatingActionButton onTouchTap={() => this.addOrder() }
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

export default connect(mapProps)(HomeView)