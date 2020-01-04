import { all, put, takeEvery, call, select } from 'redux-saga/effects'

import actions, {
  fetchPaymentStatus,
  setStateFailure,
  setStateSuccess,
  toggleLoading,
  toggleVisibility,
  paymentInsert,
} from './actions'

const getState = state => state.paymentStatus

export function* addPayment({ payload }) {
  yield put(toggleLoading(true))

  const paymentStatusState = yield select(getState)

  const fetch = paymentInsert({
    payment: payload.values,
    passengerId: paymentStatusState.payload.passengerId,
  })

  const result = yield call(fetch.request)

  if (result.response.data) {
    yield put(setStateSuccess({}))

    yield put(toggleVisibility(false))
  } else {
    const validationError = result.networkError.result.errors[0]
    yield put(setStateFailure(validationError))
  }
}

export function* getPaymentStatus({ payload }) {
  yield put(toggleLoading(true))

  yield put(toggleVisibility(true))

  const fetch = fetchPaymentStatus(payload)
  const result = yield call(fetch.request)

  if (result.response.data) {
    yield put(setStateSuccess(result.response.data.paymentStatus))
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
    takeEvery(actions.PAYMENT_INSERT, addPayment),
    SET_STATE(), // run once on app load to init listeners
  ])
}
