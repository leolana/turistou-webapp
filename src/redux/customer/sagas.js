import { all, call, put, takeEvery } from 'redux-saga/effects'
import actions, { fetchCustomersSuccess, fetchCustomersFailure, fetchCustomers } from './actions'

export function* getData() {
  const fetchCustomer = fetchCustomers()
  const result = yield call(fetchCustomer.request)

  if (result.response.data) {
    yield put(fetchCustomersSuccess(result.response.data))
  } else {
    const validationError = result.networkError.result.errors[0]
    yield put(fetchCustomersFailure(validationError))
  }
}

export function* SET_STATE() {
  yield put({
    type: actions.SET_STATE,
  })
}

export default function* rootSaga() {
  yield all([takeEvery(actions.GET_CUSTOMERS, getData), SET_STATE()])
}
