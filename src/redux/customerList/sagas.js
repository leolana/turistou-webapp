import { all, call, put, takeEvery } from 'redux-saga/effects'
import actions, { fetchCustomersSuccess, fetchCustomersFailure } from './actions'

export function* getData({ request }) {
  const result = yield call(request)

  if (result.response && result.response.data) {
    yield put(fetchCustomersSuccess(result.response.data))
  } else if (result.error) {
    yield put(fetchCustomersFailure(result.error))
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
