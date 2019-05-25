import auth0 from 'auth0-js'
import { DateTime } from 'luxon'
import { notification } from 'antd'

import config from '../config'

const auth0Client = new auth0.WebAuth({
  domain: config.auth0.domain,
  clientID: config.auth0.clientId,
  redirectUri: `${config.app.url}/callback`,
  audience: config.auth0.audience,
  responseType: 'token id_token',
  scope: 'openid email profile',
})

export function login() {
  return new Promise(async (resolve, reject) => {
    try {
      await auth0Client.authorize()
      resolve(true)
    } catch (error) {
      notification.warning({
        message: error.code,
        description: error.message,
      })
      reject(error)
    }
  })
}

export function silentAuth() {
  return new Promise((resolve, reject) => {
    auth0Client.checkSession({}, (err, authResult) => {
      if (err) return reject(err)
      setSession(authResult)
      return resolve(authResult)
    })
  })
}

export function isAuthenticated() {
  const expiresAt = +sessionStorage.getItem('turistou_auth_idToken')
  if (!expiresAt) {
    return false
  }
  // Check whether the current time is past the token's expiry time
  const now = DateTime.local().valueOf()
  return now < expiresAt
}

export function handleAuthentication() {
  return new Promise((resolve, reject) => {
    auth0Client.parseHash((err, authResult) => {
      if (err) return reject(err)
      if (!authResult || !authResult.idToken) {
        return reject(err)
      }
      setSession(authResult)
      const { idToken } = authResult
      const profile = authResult.idTokenPayload
      // set the time that the id token will expire at
      const expiresAt = authResult.idTokenPayload.exp * 1000
      return resolve({
        authenticated: true,
        idToken,
        profile,
        expiresAt,
      })
    })
  })
}

const setSession = authResult => {
  if (!authResult) return
  const { idToken } = authResult
  // set the time that the id token will expire at
  const expiresAt = authResult.expiresIn * 1000 + DateTime.local().valueOf()
  sessionStorage.setItem('turistou_auth_expiresAt', idToken)
  sessionStorage.setItem('turistou_auth_idToken', expiresAt)
}

export async function logout() {
  await auth0Client.logout({
    returnTo: `${config.app.url}/user/login`,
    clientID: config.auth0.clientId,
  })

  sessionStorage.removeItem('turistou_auth_expiresAt')
  sessionStorage.removeItem('turistou_auth_idToken')
}

export function getIdToken() {
  const idToken = +sessionStorage.removeItem('turistou_auth_idToken')
  return idToken
}
