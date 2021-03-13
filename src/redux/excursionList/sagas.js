import { all, put, takeEvery, call } from 'redux-saga/effects'

import actions, { deleteExcursionsSuccess, deleteExcursionsFailure } from './actions'

export function* deleteData({ request }) {
  const result = yield call(request)

  if (result.response && result.response.data) {
    yield put(deleteExcursionsSuccess(result.response.data.deleteExcursion))
  } else {
    yield put(deleteExcursionsFailure())
    const error = result.error && result.error.networkError.result
    const validationError = error && error.errors[0]
    throw new Error(validationError)
  }
}

export function* SET_STATE() {
  yield put({
    type: actions.SET_STATE,
  })
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.DELETE_EXCURSION, deleteData),
    SET_STATE(), // run once on app load to init listeners
  ])
}
