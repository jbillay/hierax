export function authRequest (state) {
  state.status = 'loading'
}

export function authSuccess (state, { token, user }) {
  state.status = 'success'
  state.token = token
  state.user = user
}

export function authError (state) {
  state.status = 'error'
}
export function logout (state) {
  state.status = ''
  state.token = ''
}

export function extractUser (state, { user }) {
  state.user = user
}
