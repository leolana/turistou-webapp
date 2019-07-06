import { all, put } from 'redux-saga/effects'
// import gql from 'graphql-tag'

// import actions from './actions'

// export function* GET_DATA() {
//   console.log('------------- excursion ------------')
//   const result = yield call(fetchProperty)
//   console.log(result)

//   yield put({
//     type: 'excursion/SET_STATE',
//     payload: {
//       filter: mko(),
//     },
//   })
// }

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
    // takeEvery(actions.GET_DATA, GET_DATA),
    SET_STATE(), // run once on app load to init listeners
  ])
}
