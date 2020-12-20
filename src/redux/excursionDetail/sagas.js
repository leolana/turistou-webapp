import { all, takeEvery, call, put, takeLatest } from 'redux-saga/effects'
import { notification } from 'antd'

import actions, {
  saveExcursionSuccess,
  saveExcursionFailure,
  getExcursionByIdSuccess,
  getExcursionByIdFailure,
} from './actions'

export function* save({ request }) {
  const result = yield call(request)

  if (result.response?.data) {
    yield put(saveExcursionSuccess(result.response.data.saveExcursion))

    notification.success({
      message: 'Sucesso',
      description: 'Nova excursão cadastrada com sucesso!',
    })
  } else {
    const validationError = result.networkError?.result?.errors[0]
    yield put(saveExcursionFailure(validationError))
    notification.error({
      message: 'Error',
      description: 'Houve algum problema ao salvar uma nova excursão!',
    })
  }
}

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
  yield all([
    takeEvery(actions.SAVE_EXCURSION, save),
    takeLatest(actions.GET_EXCURSION_BY_ID, getById),
  ])
}
