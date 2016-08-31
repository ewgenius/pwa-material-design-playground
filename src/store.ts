import {Action} from 'redux'

const store = {}

export default (state = store, action: Action) => {
  switch (action.type) {
    default:
      return state
  }
}