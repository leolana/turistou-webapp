import { all, put, takeEvery, call } from 'redux-saga/effects'

import actions, {
  setToBooked,
  savePassengerStatusSuccess,
  savePassengerStatusFailure,
  setToCanceled,
  swapPassengersStatus,
} from './actions'

export function* bookPassenger({ payload }) {
  const fetch = setToBooked(payload.passengerId)

  const result = yield call(fetch.request)

  if (result.response.data) {
    yield put(savePassengerStatusSuccess({}))
  } else {
    const validationError = result.networkError.result.errors[0]
    yield put(savePassengerStatusFailure(validationError))
  }
}

export function* cancelPassenger({ payload }) {
  const fetch = setToCanceled(payload.passengerId, payload.amountRefunded)

  const result = yield call(fetch.request)

  if (result.response.data) {
    yield put(savePassengerStatusSuccess({}))
  } else {
    const validationError = result.networkError.result.errors[0]
    yield put(savePassengerStatusFailure(validationError))
  }
}

export function* swapPassengers({ payload }) {
  const fetch = swapPassengersStatus(payload.id, payload.idOfPassengerToBeSwappedWith)
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
    takeEvery(actions.SET_TO_CANCELED, cancelPassenger),
    takeEvery(actions.SWAP_PASSENGERS, swapPassengers),
    SET_STATE(), // run once on app load to init listeners
  ])
}
