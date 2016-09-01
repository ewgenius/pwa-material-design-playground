import * as R from 'ramda'
import {Action} from 'redux'
import {User} from 'firebase'

import {
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE
} from './actions/auth.ts'

export interface AppState {
  user: User
}

const appState: AppState = {
  user: null
}

export default (state: AppState = appState, action: any) => {
  console.log(action)
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return R.set(R.lensProp('user'), action.user, state)
    default:
      return state
  }
}