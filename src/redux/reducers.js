import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import user from './user/reducers'
import menu from './menu/reducers'
import settings from './settings/reducers'
import step from './step/reducers'
import excursion from './excursion/reducers'
import passenger from './passenger/reducers'

export default history =>
  combineReducers({
    router: connectRouter(history),
    user,
    menu,
    settings,
    step,
    excursion,
    passenger,
  })
