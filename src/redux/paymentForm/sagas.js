import { all, put, takeEvery, call } from 'redux-saga/effects'

import actions, {
  fetchPaymentStatus,
  setStateFailure,
  setStateSuccess,
  toggleLoading,
  toggleVisibility,
} from './actions'

export function* getPaymentStatus({ payload }) {
  yield put(toggleLoading(true))

  yield put(toggleVisibility(true))

  const fetch = fetchPaymentStatus(payload)
  const result = yield call(fetch.request)

  if (result.response.data) {
    yield put(setStateSuccess({ data: result.response.data.paymentStatus }))
  } else {
    const validationError = result.networkError.result.errors[0]
    yield put(setStateFailure(validationError))
  }
}

export function* SET_STATE() {
  yield put({
    type: actions.SET_STATE,
  })
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_PAYMENT_STATUS, getPaymentStatus),
    SET_STATE(), // run once on app load to init listeners
  ])
}
