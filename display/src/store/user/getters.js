export function isLoggedIn (state) {
  return !!state.token
}

export function authStatus (state) {
  return state.status
}

export function userInfo (state) {
  return state.user
}
