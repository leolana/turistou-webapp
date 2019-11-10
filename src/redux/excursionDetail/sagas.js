import { all, takeEvery, call, put } from 'redux-saga/effects'
import { notification } from 'antd'

import actions, { saveExcursion, saveExcursionSuccess, saveExcursionFailure } from './actions'

export function* save({ payload }) {
  const result = yield call(saveExcursion, payload)
  if (result.response.data) {
    yield put(saveExcursionSuccess(result.response.data.saveExcursion))

    notification.success({
      message: 'Sucesso',
      description: 'Nova excursão cadastrada com sucesso!',
    })
  } else {
    const validationError = result.networkError.result.errors[0]
    yield put(saveExcursionFailure(validationError))
    notification.error({
      message: 'Error',
      description: 'Houve algum problema ao salvar uma nova excursão!',
    })
  }
}

export default function* rootSaga() {
  yield all([takeEvery(actions.SAVE_EXCURSION, save)])
}
