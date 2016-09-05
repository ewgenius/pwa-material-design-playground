import * as R from 'ramda'
import {Action} from 'redux'
import {User} from 'firebase'

import {
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_OUT
} from './actions/auth.ts'

import {
  SHOW_PROMPT,
  HIDE_PROMPT,
  SHOW_SIDEBAR,
  HIDE_SIDEBAR
} from './actions/ui.ts'

import {
  REQUEST_ORDERS,
  RECEIVE_ORDERS
} from './actions/orders.ts'

export interface AppSettingsState {

}

export interface AppUiState {
  showSidebar: boolean,
  showPrompt: boolean,
  promptMessage: string
  promptAction: string
  promptHandler: (any?) => any
}

export interface OrdersState {
  loading: boolean
  items: any[]
}

export interface AppState {
  user: User
  settings: AppSettingsState
  ui: AppUiState
  orders: OrdersState
}

const appState: AppState = {
  user: null,
  settings: {},
  ui: {
    showSidebar: false,
    showPrompt: false,
    promptMessage: '',
    promptAction: '',
    promptHandler: () => { }
  },
  orders: {
    loading: false,
    items: []
  }
}

const lensUser = R.lensProp('user')

const lensUi = R.lensProp('ui')
const lensUiShowSidebar = R.compose(lensUi, R.lensProp('showSidebar')) as R.Lens
const lensUiShowPrompt = R.compose(lensUi, R.lensProp('showPrompt')) as R.Lens
const lensUiPromptMessage = R.compose(lensUi, R.lensProp('promptMessage')) as R.Lens
const lensUiPromptHandler = R.compose(lensUi, R.lensProp('promptHandler')) as R.Lens
const lensUiPromptAction = R.compose(lensUi, R.lensProp('promptAction')) as R.Lens

const lensOrders = R.lensProp('orders')
const lensOrdersLoading = R.compose(lensOrders, R.lensProp('loading')) as R.Lens
const lensOrdersItems = R.compose(lensOrders, R.lensProp('items')) as R.Lens


export default (state: AppState = appState, action: any) => {
  switch (action.type) {
    case SHOW_PROMPT:
      return R.set(lensUiPromptHandler, action.handler,
        R.set(lensUiShowPrompt, true,
          R.set(lensUiPromptAction, action.action,
            R.set(lensUiPromptMessage, action.message, state))))
    case HIDE_PROMPT:
      return R.set(lensUiShowPrompt, false, state)
    case SHOW_SIDEBAR:
      return R.set(lensUiShowSidebar, true, state)
    case HIDE_SIDEBAR:
      return R.set(lensUiShowSidebar, false, state)

    case SIGN_OUT:
      return R.set(lensUser, null, state)
    case SIGN_IN_SUCCESS:
      return R.set(lensUser, action.user, state)

    case REQUEST_ORDERS:
      return R.set(lensOrdersLoading, true,
        R.set(lensOrdersItems, [], state))
    case RECEIVE_ORDERS:
      return R.set(lensOrdersLoading, false,
        R.set(lensOrdersItems, action.result, state))

    default:
      return state
  }
}