import { all, put, takeEvery, call } from 'redux-saga/effects'

import actions, { fetchPassengers, fetchPassengersSuccess, fetchPassengersFailure } from './actions'

export function* getData() {
  const fetchPassenger = fetchPassengers()
  const result = yield call(fetchPassenger.request)

  if (result.response.data) {
    yield put(fetchPassengersSuccess(result.response.data))
  } else {
    const validationError = result.networkError.result.errors[0]
    yield put(fetchPassengersFailure(validationError))
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
