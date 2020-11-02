import { all, put, takeEvery, call, select } from 'redux-saga/effects'

import { notification } from 'antd'
import passengerActions, {
  savePassenger,
  savePassengerSuccess,
  savePassengerFailure,
} from './actions'

export function* getData({ payload }) {
  const { id } = yield select(state => state.excursionDetail.payload)

  const result = yield call(savePassenger, { ...payload, excursionId: id })
  if (result.response && result.response.data) {
    yield put(savePassengerSuccess(result.response.data.savePassenger))

    notification.success({
      message: 'Sucesso',
      description: 'Novo passageiro cadastrado com sucesso!',
    })
  } else {
    const validationError = result.networkError && result.networkError.result.errors[0]
    yield put(savePassengerFailure(validationError))
    notification.error({
      message: 'Error',
      description: 'Houve algum problema ao salvar um novo passageiro!',
    })
  }
}

export default function* rootSaga() {
  yield all([takeEvery(passengerActions.SAVE_PASSENGER, getData)])
}