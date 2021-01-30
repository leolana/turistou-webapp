import { all, takeEvery, put, call, takeLatest } from 'redux-saga/effects'
import { notification } from 'antd'
import JwtDecode from 'jwt-decode'
import * as auth from '@core/auth'
import actions from '@redux/user/actions'

export function* LOGIN() {
  yield call(auth.handleAuthentication)

  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })

  yield put({
    type: 'user/LOAD_CURRENT_ACCOUNT',
  })

  notification.success({
    message: 'Logged In',
    description: 'You have successfully logged in to Clean UI React Admin Template!',
  })
}

export function* LOAD_CURRENT_ACCOUNT() {
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })

  let user = {}
  try {
    user = yield call(auth.handleAuthentication)
  } catch (error) {
    console.log(error)
  }
  const isAuthenticated = yield call(auth.isAuthenticated)
  if (isAuthenticated) {
    const token = auth.getIdToken()
    const { uid: id = 1 } = user
    const { nickname: name, email, picture: avatar } = JwtDecode(token)

    yield put({
      type: 'user/SET_STATE',
      payload: {
        id,
        name,
        email,
        avatar,
        role: 'admin',
        authorized: true,
      },
    })
  }
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* LOGOUT() {
  yield call(auth.logout)
  yield put({
    type: 'user/SET_STATE',
    payload: {
      id: '',
      name: '',
      role: '',
      email: '',
      avatar: '',
      authorized: false,
      loading: false,
    },
  })
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.LOGIN, LOGIN),
    takeLatest(actions.LOAD_CURRENT_ACCOUNT, LOAD_CURRENT_ACCOUNT),
    takeEvery(actions.LOGOUT, LOGOUT),
    LOAD_CURRENT_ACCOUNT(), // run once on app load to check user auth
  ])
}
