import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import user from 'redux/user/reducers'
import menu from 'redux/menu/reducers'
import settings from 'redux/settings/reducers'
import step from 'redux/step/reducers'
import excursion from 'redux/excursion/reducers'
import passenger from 'redux/passenger/reducers'
import customer from 'redux/customer/reducers'

export default history =>
  combineReducers({
    router: connectRouter(history),
    user,
    menu,
    settings,
    step,
    excursion,
    passenger,
    customer,
  })
