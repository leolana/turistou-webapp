import auth0 from 'auth0-js'
import { DateTime } from 'luxon'
import { notification } from 'antd'

import config from '../config'

class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: config.auth0.domain,
      clientID: config.auth0.clientId,
      redirectUri: `${config.app.url}/callback`,
      audience: config.auth0.audience,
      responseType: 'token id_token',
      scope: 'openid email',
    })

    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.handleAuthentication = this.handleAuthentication.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
    this.currentAccount = this.currentAccount.bind(this)
  }

  login() {
    return new Promise(async (resolve, reject) => {
      try {
        await this.auth0.authorize()
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

  getIdToken() {
    return this.idToken
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        console.log(err, authResult)
        if (err) return reject(err)
        if (!authResult || !authResult.idToken) {
          console.log(err)
          return reject(err)
        }
        this.setSession(authResult)
        return resolve()
      })
    })
  }

  setSession(authResult) {
    this.idToken = authResult.idToken
    // set the time that the id token will expire at
    this.expiresAt = authResult.expiresIn * 1000 + DateTime.local().valueOf()
  }

  logout() {
    //   return firebaseAuth()
    //     .signOut()
    //     .then(() => true)
    this.auth0.logout({
      returnTo: config.app.url,
      clientID: config.auth0.clientId,
    })
  }

  silentAuth() {
    return new Promise((resolve, reject) => {
      this.auth0.checkSession({}, (err, authResult) => {
        if (err) return reject(err)
        this.setSession(authResult)
        return resolve()
      })
    })
  }

  currentAccount() {
    let userLoaded = false
    const getCurrentUser = auth => {
      return new Promise((resolve, reject) => {
        if (userLoaded) {
          resolve(this.currentUser)
        }
        const unsubscribe = auth.onAuthStateChanged(user => {
          userLoaded = true
          unsubscribe()
          resolve(user)
        }, reject)
      })
    }

    return getCurrentUser(this.auth0)
  }

  isAuthenticated() {
    // Check whether the current time is past the token's expiry time
    const now = DateTime.local().valueOf()
    return now < this.expiresAt
  }
}

const auth = new Auth()

export default auth
