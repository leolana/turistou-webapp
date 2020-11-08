import { all, put, takeEvery, call } from 'redux-saga/effects'
import { notification } from 'antd'

import actions, { fetchPassengersSuccess, fetchPassengersFailure } from './actions'

export function* getData({ request }) {
  const result = yield call(request)

  try {
    if (result.response && result.response.data) {
      yield put(fetchPassengersSuccess(result.response.data))
    } else {
      const validationError = result.networkError.result.errors[0]
      yield put(fetchPassengersFailure(validationError))
    }
  } catch {
    notification.error({
      message: 'Error',
      description: 'Houve um problema ao obter os dados dos passageiros da excursão!',
    })
  }
}

export function* SET_STATE() {
  yield put({
    type: actions.SET_STATE,
  })
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_PASSENGERS, getData),
    SET_STATE(), // run once on app load to init listeners
  ])
}
