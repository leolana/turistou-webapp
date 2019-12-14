import { all, put, takeEvery, call } from 'redux-saga/effects'

import { notification } from 'antd'
import actions, { savePassenger, savePassengerSuccess, savePassengerFailure } from './actions'

export function* getData({ payload }) {
  const result = yield call(savePassenger, payload)
  if (result.response.data) {
    yield put(savePassengerSuccess(result.response.data.savePassenger))

    notification.success({
      message: 'Sucesso',
      description: 'Novo passageiro cadastrado com sucesso!',
    })
  } else {
    const validationError = result.networkError.result.errors[0]
    yield put(savePassengerFailure(validationError))
    notification.error({
      message: 'Error',
      description: 'Houve algum problema ao salvar um novo passageiro!',
    })
  }
}

export default function* rootSaga() {
  yield all([takeEvery(actions.SAVE_PASSENGER, getData)])
}
