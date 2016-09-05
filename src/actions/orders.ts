import {FIREBASE_DATABASE_ACTION} from '../lib/firebase.ts'

export const REQUEST_ORDERS = 'REQUEST_ORDERS'
export const RECEIVE_ORDERS = 'RECEIVE_ORDERS'
export const ERROR_ORDERS = 'ERROR_ORDERS'

export const requestOrders = () => dispatch => {
  dispatch({
    type: REQUEST_ORDERS
  })
  return dispatch({
    [FIREBASE_DATABASE_ACTION]: {
      path: '/orders',
      type: 'list',
      successType: RECEIVE_ORDERS,
      errorType: ERROR_ORDERS
    }
  })
}