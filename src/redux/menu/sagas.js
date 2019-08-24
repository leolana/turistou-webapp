import { all, put, call } from 'redux-saga/effects'
import { getLeftMenuData, getTopMenuData, getBreadcrumbData } from 'core/menu'

export function* GET_DATA() {
  const menuLeftData = yield call(getLeftMenuData)
  const menuTopData = yield call(getTopMenuData)
  const breadcrumbData = yield call(getBreadcrumbData)
  yield put({
    type: 'menu/SET_STATE',
    payload: {
      menuLeftData,
      menuTopData,
      breadcrumbData,
    },
  })
}

export default function* rootSaga() {
  yield all([
    GET_DATA(), // run once on app load to fetch menu data
  ])
}
