import { all, put, takeEvery, call } from 'redux-saga/effects'

import actions, { fetchExcursions, fetchExcursionsSuccess, fetchExcursionsFailure } from './actions'

export function* getData() {
  const fetchExcursion = fetchExcursions()
  const result = yield call(fetchExcursion.request)
  if (result.response.data) {
    yield put(fetchExcursionsSuccess(result.response.data))
  } else {
    const validationError = result.networkError.result.errors[0]
    yield put(fetchExcursionsFailure(validationError))
  }
}

export function* SET_STATE() {
  yield put({
    type: actions.SET_STATE,
  })
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_EXCURSIONS, getData),
    SET_STATE(), // run once on app load to init listeners
  ])
}
