import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import user from 'redux/user/reducers'
import menu from 'redux/menu/reducers'
import settings from 'redux/settings/reducers'
import step from 'redux/step/reducers'
import excursionList from 'redux/excursionList/reducers'
import excursionDetail from 'redux/excursionDetail/reducers'
import passengerList from 'redux/passengerList/reducers'
import passengerDetail from 'redux/passengerDetail/reducers'
import passengerStatus from 'redux/passengerStatus/reducers'
import customerList from 'redux/customerList/reducers'
import customerDetail from 'redux/customerDetail/reducers'
import payments from 'redux/payments/reducers'
import paymentStatus from 'redux/paymentStatus/reducers'

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    user,
    menu,
    settings,
    step,
    excursionList,
    excursionDetail,
    passengerList,
    passengerDetail,
    passengerStatus,
    customerList,
    customerDetail,
    payments,
    paymentStatus,
  })
