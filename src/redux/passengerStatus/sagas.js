import { all, put, takeEvery, call } from 'redux-saga/effects'

import actions, {
  setToBooked,
  savePassengerStatusSuccess,
  savePassengerStatusFailure,
} from './actions'

export function* bookPassenger({ payload }) {
  debugger
  const fetch = setToBooked(payload.passengerId)

  const result = yield call(fetch.request)

  if (result.response.data) {
    yield put(savePassengerStatusSuccess({}))
  } else {
    const validationError = result.networkError.result.errors[0]
    yield put(savePassengerStatusFailure(validationError))
  }
}

export function* SET_STATE() {
  yield put({
    type: actions.SET_STATE,
  })
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.SET_TO_BOOKED, bookPassenger),
    SET_STATE(), // run once on app load to init listeners
  ])
}
