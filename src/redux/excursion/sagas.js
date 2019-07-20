import { all, put, takeEvery, call } from 'redux-saga/effects'

import actions, { fetchExcursions } from './actions'

export function* getData() {
  const fetchExcursion = fetchExcursions()
  const result = yield call(fetchExcursion.request)

  yield put({
    type: 'filter/SET_STATE',
    payload: {
      ...result,
    },
  })
}

export function* SET_STATE() {
  yield put({
    type: 'filter/SET_STATE',
    payload: {
      filter: 1,
    },
  })
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_EXCURSIONS, getData),
    SET_STATE(), // run once on app load to init listeners
  ])
}
