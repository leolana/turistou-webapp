import { all, put, takeEvery, call, select } from 'redux-saga/effects'

import actions, {
  fetchPayments,
  togglePaymentListVisibility,
  togglePaymentsUpdateVisibility,
  setStateSuccess,
  setStateFailure,
  toggleLoading,
  setToPaid,
  setToUnpaid,
} from './actions'

const getPayments = state => state.payments

export function* getPaymentsUpdate({ payload }) {
  yield put(toggleLoading(true))

  yield put(togglePaymentsUpdateVisibility(true))

  const fetch = fetchPayments(payload)
  const result = yield call(fetch.request)

  if (result.response.data) {
    yield put(setStateSuccess(result.response.data))
  } else {
    const validationError = result.networkError.result.errors[0]
    yield put(setStateFailure(validationError))
  }
}

export function* getPaymentsList({ payload }) {
  yield put(toggleLoading(true))

  yield put(togglePaymentListVisibility(true))

  const fetch = fetchPayments(payload)
  const result = yield call(fetch.request)

  if (result.response.data) {
    yield put(
      setStateSuccess(
        result.response.data.payments.map(p => ({
          ...p,
          passengerId: payload.passengerId,
        })),
      ),
    )
  } else {
    const validationError = result.networkError.result.errors[0]
    yield put(setStateFailure(validationError))
  }
}

export function* setPayDayToPaid({ payload }) {
  yield put(toggleLoading(true))

  const fetch = setToPaid(payload)
  const result = yield call(fetch.request)

  if (result.response.data.setPayDateToPaid) {
    const statePayments = yield select(getPayments)

    const parsedPayments = statePayments.payload.map(p => {
      if (p.id === result.response.data.setPayDateToPaid.id) {
        return {
          ...p,
          ...result.response.data.setPayDateToPaid,
        }
      }

      return p
    })

    yield put(setStateSuccess(parsedPayments))
  } else {
    const validationError = result.networkError.result.errors[0]

    yield put(setStateFailure(validationError))
  }
}

export function* setPayDateToUnpaid({ payload }) {
  yield put(toggleLoading(true))

  const fetch = setToUnpaid(payload)
  const result = yield call(fetch.request)

  if (result.response.data.setPayDateToUnpaid) {
    const statePayments = yield select(getPayments)

    const parsedPayments = statePayments.payload.map(p => {
      if (p.id === result.response.data.setPayDateToUnpaid.id) {
        return {
          ...p,
          ...result.response.data.setPayDateToUnpaid,
        }
      }

      return p
    })

    yield put(setStateSuccess(parsedPayments))
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
    takeEvery(actions.GET_PAYMENTS_LIST, getPaymentsList),
    takeEvery(actions.GET_PAYMENTS_UPDATE, getPaymentsUpdate),
    takeEvery(actions.SET_TO_PAID, setPayDayToPaid),
    takeEvery(actions.SET_TO_UNPAID, setPayDateToUnpaid),
    SET_STATE(), // run once on app load to init listeners
  ])
}
