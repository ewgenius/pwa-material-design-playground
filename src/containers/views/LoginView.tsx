import * as React from 'react'
import {Component} from 'react'
import {Dispatch} from 'redux'
import {connect} from 'react-redux'
import {AppBar, RaisedButton} from 'material-ui'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Flex from '../../components/Layout/Flex.tsx'
import {User} from 'firebase'
import {AppState} from '../../store.ts'
import {signIn, signOut} from '../../actions/auth.ts'

function mapProps(state: { store: AppState }) {
  return {
    user: state.store.user
  }
}

interface LoginViewProps {
  user: User,
  dispatch: Dispatch<any>
}

class LoginView extends Component<LoginViewProps, {}> {
  signIn() {
    this.props.dispatch(signIn())
  }

  signOut() {
    this.props.dispatch(signOut())
  }

  render() {
    const {user} = this.props

    return <Flex flow='row' alignItems='center'>

      {user ?
        <Flex flow='column' alignItems='center'>
          <img src={user.providerData[0].photoURL}/>
          <RaisedButton label='SIGN OUT' onTouchTap={() => this.signOut() }/>
        </Flex>
        :
        <Flex flow='column' alignItems='center'>
          <RaisedButton label='SIGN IN' onTouchTap={() => this.signIn() }/>
        </Flex>
      }
    </Flex>
  }
}

export default connect(mapProps)(LoginView)