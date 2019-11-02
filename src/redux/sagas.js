import { all } from 'redux-saga/effects'
import user from './user/sagas'
import menu from './menu/sagas'
import settings from './settings/sagas'
import customer from './customer/sagas'
import excursionList from './excursionList/sagas'
import excursionDetail from './excursionDetail/sagas'

export default function* rootSaga() {
  yield all([user(), menu(), settings(), customer(), excursionList(), excursionDetail()])
}
