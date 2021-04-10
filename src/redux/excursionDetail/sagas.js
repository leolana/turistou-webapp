import { all, call, put, takeLatest } from 'redux-saga/effects'
import { notification } from 'antd'

import { actions, getExcursionByIdSuccess, getExcursionByIdFailure } from './actions'

export function* getById({ request }) {
  const result = yield call(request)

  if (result.response && result.response.data) {
    yield put(getExcursionByIdSuccess(result.response.data))
  } else {
    notification.error({
      message: 'Error',
      description: 'Houve algum problema ao obter os dados da excursão!',
    })
    // const validationError = result && result.networkError && result.networkError.result.errors[0]
    yield put(getExcursionByIdFailure())
  }
}

export default function* rootSaga() {
  yield all([takeLatest(actions.GET_EXCURSION_BY_ID, getById)])
}
