import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import user from 'redux/user/reducers'
import menu from 'redux/menu/reducers'
import settings from 'redux/settings/reducers'
import step from 'redux/step/reducers'
import excursionList from 'redux/excursionList/reducers'
import excursionDetail from 'redux/excursionDetail/reducers'
import passenger from 'redux/passenger/reducers'
import customer from 'redux/customer/reducers'

export default history =>
  combineReducers({
    router: connectRouter(history),
    user,
    menu,
    settings,
    step,
    excursionList,
    excursionDetail,
    passenger,
    customer,
  })
