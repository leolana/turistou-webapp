import { all, takeEvery, call, put, takeLatest } from 'redux-saga/effects'
import { notification } from 'antd'

import actions, {
  saveExcursion,
  saveExcursionSuccess,
  saveExcursionFailure,
  getExcursionById,
  getExcursionByIdSuccess,
  getExcursionByIdFailure,
} from './actions'

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

export function* getById({ id }) {
  const getExcursion = getExcursionById(id)
  const result = yield call(getExcursion.request)

  if (result.response.data) {
    yield put(getExcursionByIdSuccess(result.response.data))
  } else {
    const validationError = result.networkError.result.errors[0]
    yield put(getExcursionByIdFailure(validationError))
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.SAVE_EXCURSION, save),
    takeLatest(actions.GET_EXCURSION_BY_ID, getById),
  ])
}
