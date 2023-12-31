import { all, put } from 'redux-saga/effects'

export function* SET_STATE() {
  yield put({
    type: 'step/SET_STATE',
    payload: {
      current: 0,
    },
  })
}

export default function* rootSaga() {
  yield all([
    SET_STATE(), // run once on app load to fetch menu data
  ])
}
