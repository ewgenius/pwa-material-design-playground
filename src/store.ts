import * as R from 'ramda'
import {Action} from 'redux'
import {User} from 'firebase'

import {
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_OUT
} from './actions/auth.ts'

export interface AppState {
  user: User
}

const appState: AppState = {
  user: null
}

const lensUser = R.lensProp('user')

export default (state: AppState = appState, action: any) => {
  switch (action.type) {
    case SIGN_OUT:
      return R.set(lensUser, null, state)
    case SIGN_IN_SUCCESS:
      return R.set(lensUser, action.user, state)
    default:
      return state
  }
}