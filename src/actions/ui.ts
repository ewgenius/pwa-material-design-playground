export const SHOW_PROMPT = 'SHOW_PROMT'
export const HIDE_PROMPT = 'HIDE_PROMT'
export const SHOW_SIDEBAR = 'SHOW_SIDEBAR'
export const HIDE_SIDEBAR = 'HIDE_SIDEBAR'

export function showPrompt(message: string, action: string, handler: (any?) => any) {
  return {
    type: SHOW_PROMPT,
    action,
    message,
    handler
  }
}

export const hidePrompt = () => ({
  type: HIDE_PROMPT
})

export const showSidebar = () => ({
  type: SHOW_SIDEBAR
})

export const hideSidebar = () => ({
  type: HIDE_SIDEBAR
})