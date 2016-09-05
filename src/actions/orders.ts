import {FIREBASE_DATABASE_ACTION} from '../lib/firebase.ts'

export const CREATE_ORDER = 'CREATE_ORDER'
export const CREATED_ORDER = 'CREATED_ORDER'
export const ERROR_CREATE_ORDER = 'ERROR_CREATE_ORDER'
export const REQUEST_ORDERS = 'REQUEST_ORDERS'
export const RECEIVE_ORDERS = 'RECEIVE_ORDERS'
export const ERROR_ORDERS = 'ERROR_ORDERS'

export const createOrder = (order) => dispatch => {
  dispatch({
    type: CREATE_ORDER
  })
  return dispatch({
    [FIREBASE_DATABASE_ACTION]: {
      path: '/orders',
      type: 'push',
      value: order,
      successType: CREATED_ORDER,
      errorType: ERROR_CREATE_ORDER
    }
  })
}

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