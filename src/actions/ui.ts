export const SHOW_PROMPT = 'SHOW_PROMT'
export const HIDE_PROMPT = 'HIDE_PROMT'

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