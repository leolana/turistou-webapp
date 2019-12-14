import { all } from 'redux-saga/effects'
import user from './user/sagas'
import menu from './menu/sagas'
import settings from './settings/sagas'
import customerList from './customerList/sagas'
import customerDetail from './customerDetail/sagas'
import excursionList from './excursionList/sagas'
import excursionDetail from './excursionDetail/sagas'
import passengerList from './passengerList/sagas'
import passengerDetail from './passengerDetail/sagas'
import payments from './payments/sagas'

export default function* rootSaga() {
  yield all([
    user(),
    menu(),
    settings(),
    customerList(),
    customerDetail(),
    excursionList(),
    excursionDetail(),
    passengerList(),
    passengerDetail(),
    payments(),
  ])
}
