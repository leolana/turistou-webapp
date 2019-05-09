import { all, put } from 'redux-saga/effects'

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
    SET_STATE(), // run once on app load to fetch menu data
  ])
}
