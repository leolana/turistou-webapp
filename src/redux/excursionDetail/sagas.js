import { all, put, takeEvery, call } from 'redux-saga/effects'

import actions, { saveExcursion, saveExcursionSuccess, saveExcursionFailure } from './actions'

export function* save(payload) {
  const fetchExcursion = saveExcursion()
  const result = yield call(fetchExcursion.request, payload)
  if (result.response.data) {
    yield put(saveExcursionSuccess(result.response.data))
  } else {
    const validationError = result.networkError.result.errors[0]
    yield put(saveExcursionFailure(validationError))
  }
}

export default function* rootSaga() {
  yield all([takeEvery(actions.SAVE_EXCURSION, save)])
}
