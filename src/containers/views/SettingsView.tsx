import * as React from 'react'
import {Component} from 'react'
import {Dispatch} from 'redux'
import {connect} from 'react-redux'
import {push, goBack} from 'react-router-redux'
import {User} from 'firebase'
import {AppState} from '../../store.ts'
import {signIn, signOut} from '../../actions/auth.ts'

import {AppBar, RaisedButton, IconButton} from 'material-ui'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import Flex from '../../components/Layout/Flex.tsx'
import HeaderLayout from '../../components/Layout/HeaderLayout.tsx'

function mapProps(state: { store: AppState }) {
  return {
    user: state.store.user
  }
}

interface LoginViewProps {
  user: User,
  dispatch: Dispatch<any>
}

class SettingsView extends Component<LoginViewProps, {}> {
  signOut() {
    this.props.dispatch(signOut())
  }

  navigateBack() {
    this.props.dispatch(goBack())
  }

  render() {
    const {user} = this.props

    return <HeaderLayout appBar={
      <AppBar
        iconElementLeft={<IconButton onTouchTap={() => this.navigateBack()}>
          <ArrowBack />
        </IconButton>}
        title='settings'/>
    }>

      {user ?
        <Flex flow='column' alignItems='center'>
          <img src={user.providerData[0].photoURL}/>
          <RaisedButton label='SIGN OUT' onTouchTap={() => this.signOut() }/>
        </Flex>
        : null
      }
    </HeaderLayout>
  }
}

export default connect(mapProps)(SettingsView)