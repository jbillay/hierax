import axios from 'axios'
import jwt from 'jsonwebtoken'

function cleanSecret (secret) {
  let cleanSecret = secret
  if (secret.charAt(0) === '"') {
    cleanSecret = secret.slice(1)
  }
  if (cleanSecret.charAt(cleanSecret.length - 1) === '"') {
    cleanSecret = cleanSecret.slice(0, -1)
  }
  return cleanSecret
}

export function login ({ state, commit, rootState }, user) {
  return new Promise((resolve, reject) => {
    commit('authRequest')
    axios.post('https://localhost:4242/v1/auth/login', user)
      .then(resp => {
        const token = resp.data.user.token
        const secret = cleanSecret(process.env.JWT_SECRET)
        console.log(process.env.JWT_SECRET)
        console.log(secret)
        const user = jwt.verify(token, secret)
        localStorage.setItem('token', token)
        commit('authSuccess', { token, user })
        resolve(resp)
      })
      .catch(err => {
        commit('authError')
        localStorage.removeItem('token')
        reject(err)
      })
  })
}

export function logout ({ commit }) {
  return new Promise((resolve, reject) => {
    commit('logout')
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
    resolve()
  })
}

export function getUserInfo ({ commit }) {
  const token = localStorage.getItem('token')
  if (token) {
    const secret = cleanSecret(process.env.JWT_SECRET)
    const user = jwt.verify(token, secret)
    commit('extractUser', { user })
  }
}
