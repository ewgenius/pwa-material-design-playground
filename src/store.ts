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
  HIDE_PROMPT
} from './actions/ui.ts'

export interface AppSettings {

}

export interface AppUi {
  showPrompt: boolean,
  promptMessage: string
  promptAction: string
  promptHandler: (any?) => any
}

export interface AppState {
  user: User
  settings: AppSettings
  ui: AppUi
}

const appState: AppState = {
  user: null,
  settings: {},
  ui: {
    showPrompt: false,
    promptMessage: '',
    promptAction: '',
    promptHandler: () => { }
  }
}

const lensUser = R.lensProp('user')
const lensUi = R.lensProp('ui')
const lensUiShowPrompt = R.compose(lensUi, R.lensProp('showPrompt')) as R.Lens
const lensUiPromptMessage = R.compose(lensUi, R.lensProp('promptMessage')) as R.Lens
const lensUiPromptHandler = R.compose(lensUi, R.lensProp('promptHandler')) as R.Lens
const lensUiPromptAction = R.compose(lensUi, R.lensProp('promptAction')) as R.Lens

export default (state: AppState = appState, action: any) => {
  switch (action.type) {
    case SHOW_PROMPT:
      return R.set(lensUiPromptHandler, action.handler,
        R.set(lensUiShowPrompt, true,
          R.set(lensUiPromptAction, action.action,
            R.set(lensUiPromptMessage, action.message, state))))
    case HIDE_PROMPT:
      return R.set(lensUiShowPrompt, false, state)
    case SIGN_OUT:
      return R.set(lensUser, null, state)
    case SIGN_IN_SUCCESS:
      return R.set(lensUser, action.user, state)
    default:
      return state
  }
}