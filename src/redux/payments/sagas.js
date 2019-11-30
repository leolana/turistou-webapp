import { all, put, takeEvery, call } from 'redux-saga/effects'

import actions, {
  fetchPayments,
  fetchPaymentsSuccess,
  fetchPaymentsFailure,
  toggleVisibility,
  toggleLoading,
} from './actions'

export function* getData({ payload }) {
  yield put(toggleLoading(true))

  yield put(toggleVisibility(true))

  const fetch = fetchPayments(payload)
  const result = yield call(fetch.request)

  if (result.response.data) {
    yield put(fetchPaymentsSuccess(result.response.data))
  } else {
    const validationError = result.networkError.result.errors[0]
    yield put(fetchPaymentsFailure(validationError))
  }
}

export function* SET_STATE() {
  yield put({
    type: actions.SET_STATE,
  })
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_PAYMENTS, getData),
    SET_STATE(), // run once on app load to init listeners
  ])
}
