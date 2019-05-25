import { all, takeEvery, put, call } from 'redux-saga/effects'
import { notification } from 'antd'
import auth from 'services/auth'
import actions from 'redux/user/actions'

export function* LOGIN() {
  console.log('------------- LOGIN -------------')
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
  console.log('------------- LOAD_CURRENT_ACCOUNT -------------')
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })
  console.log('---------- isAuthenticated ------------')
  const isAuthorized = yield call(auth.isAuthenticated)
  console.log(isAuthorized)
  if (!isAuthorized) {
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
  const response = {}
  if (isAuthorized) {
    const { uid: id, email, photoURL: avatar } = response
    yield put({
      type: 'user/SET_STATE',
      payload: {
        id,
        name: 'Administrator',
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
    takeEvery(actions.LOAD_CURRENT_ACCOUNT, LOAD_CURRENT_ACCOUNT),
    takeEvery(actions.LOGOUT, LOGOUT),
    LOAD_CURRENT_ACCOUNT(), // run once on app load to check user auth
  ])
}
