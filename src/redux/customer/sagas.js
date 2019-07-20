import { all, put } from 'redux-saga/effects'
import actions from './actions'

export function* SET_STATE() {
  yield put({
    type: actions.SET_STATE,
    payload: {
      filter: 1,
    },
  })
}

export default function* rootSaga() {
  yield all([SET_STATE()])
}
