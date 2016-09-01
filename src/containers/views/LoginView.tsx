import * as React from 'react'
import {Component} from 'react'
import {Dispatch} from 'redux'
import {connect} from 'react-redux'
import {AppBar, RaisedButton} from 'material-ui'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Flex from '../../components/Layout/Flex.tsx'
import {User} from 'firebase'
import {AppState} from '../../store.ts'
import {signIn} from '../../actions/auth.ts'

function mapProps(state: AppState) {
  return {
    user: state.user
  }
}

class LoginView extends Component<{
  user: User,
  dispatch: Dispatch<any>
}, {}> {
  signIn() {
    this.props.dispatch(signIn())
  }

  render() {
    const {user} = this.props

    return <Flex alignItems='center'>
      <Flex flow='row' alignItems='center'>
        {user ? user.displayName : null}
      </Flex>
      <Flex flow='row' alignItems='center'>
        <RaisedButton label='SIGN IN' onTouchTap={() => this.signIn() }/>
      </Flex>
    </Flex>
  }
}

export default connect(mapProps)(LoginView)