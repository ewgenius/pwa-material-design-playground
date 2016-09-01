import {FIREBASE_AUTH_ACTION} from '../lib/firebase.ts'

export const SIGN_IN = 'SIGN_IN'
export const SIGN_OUT = 'SIGN_OUT'
export const SIGN_OUT_SUCCESS = 'SIGN_IN_SUCCESS'
export const SIGN_OUT_FAILURE = 'SIGN_OUT_FAILURE'
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS'
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE'

export const signIn = () => dispatch => {
  dispatch({
    type: SIGN_IN
  })

  return dispatch({
    [FIREBASE_AUTH_ACTION]: {
      action: 'signIn',
      successType: SIGN_IN_SUCCESS,
      errorType: SIGN_IN_FAILURE,
    }
  })
}

export const signOut = () => dispatch => {
  dispatch({
    type: SIGN_OUT
  })

  return dispatch({
    [FIREBASE_AUTH_ACTION]: {
      action: 'signOut',
      successType: SIGN_OUT_SUCCESS,
      errorType: SIGN_OUT_FAILURE,
    }
  })
}