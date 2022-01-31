import { all } from 'redux-saga/effects'
import user from './user/sagas'
import menu from './menu/sagas'
import settings from './settings/sagas'
import payments from './payments/sagas'
import paymentForm from './paymentStatus/sagas'

export default function* rootSaga() {
  yield all([user(), menu(), settings(), payments(), paymentForm()])
}
