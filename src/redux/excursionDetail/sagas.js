import { all, takeEvery, call } from 'redux-saga/effects'

import actions, { saveExcursion } from './actions'

export function* save({ payload }) {
  const result = yield call(saveExcursion, payload)
  console.log(result)
}

export default function* rootSaga() {
  yield all([takeEvery(actions.SAVE_EXCURSION, save)])
}
