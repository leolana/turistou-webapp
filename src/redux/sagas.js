import { all } from 'redux-saga/effects'
import user from './user/sagas'
import menu from './menu/sagas'
import settings from './settings/sagas'
import customerDetail from './customerDetail/sagas'
import excursionList from './excursionList/sagas'
import excursionDetail from './excursionDetail/sagas'
import passengerList from './passengerList/sagas'
import passengerStatus from './passengerStatus/sagas'
import payments from './payments/sagas'
import paymentForm from './paymentStatus/sagas'

export default function* rootSaga() {
  yield all([
    user(),
    menu(),
    settings(),
    customerDetail(),
    excursionList(),
    excursionDetail(),
    passengerList(),
    passengerStatus(),
    payments(),
    paymentForm(),
  ])
}
