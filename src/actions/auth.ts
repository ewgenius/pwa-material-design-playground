import {FIREBASE_AUTH_ACTION} from '../lib/firebase.ts'

export const SIGN_IN = 'SIGN_IN'
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS'
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE'

export const signIn = () => dispatch => {
  dispatch({
    type: SIGN_IN
  })

  return dispatch({
    [FIREBASE_AUTH_ACTION]: {
      successType: SIGN_IN_SUCCESS,
      errorType: SIGN_IN_FAILURE,
    }
  })
}