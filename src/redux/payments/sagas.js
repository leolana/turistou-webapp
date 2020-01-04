import { all, put, takeEvery, call, select } from 'redux-saga/effects'

import actions, {
  fetchPayments,
  toggleVisibility,
  setStateSuccess,
  setStateFailure,
  toggleLoading,
  setToPaid,
  setToUnpaid,
} from './actions'

const getPaymentsFromState = state => state.payments

export function* getPayments({ payload }) {
  yield put(toggleLoading(true))

  yield put(toggleVisibility(true))

  const fetch = fetchPayments(payload)
  const result = yield call(fetch.request)

  console.log('RESULT===', result)

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
    const statePayments = yield select(getPaymentsFromState)

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
    const statePayments = yield select(getPaymentsFromState)

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
    takeEvery(actions.GET_PAYMENTS, getPayments),
    takeEvery(actions.SET_TO_PAID, setPayDayToPaid),
    takeEvery(actions.SET_TO_UNPAID, setPayDateToUnpaid),
    SET_STATE(), // run once on app load to init listeners
  ])
}
