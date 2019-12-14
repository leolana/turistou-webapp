import { all, takeEvery, call, put } from 'redux-saga/effects'
import { notification } from 'antd'

import actions, { saveCustomer, saveCustomerSuccess, saveCustomerFailure } from './actions'

export function* save({ payload }) {
  const result = yield call(saveCustomer, payload)
  if (result.response.data) {
    yield put(saveCustomerSuccess(result.response.data.saveCustomer))

    notification.success({
      message: 'Sucesso',
      description: 'Cliente cadastrado com sucesso!',
    })
  } else {
    const validationError = result.networkError.result.errors[0]
    yield put(saveCustomerFailure(validationError))
    notification.error({
      message: 'Error',
      description: 'Houve algum problema ao salvar o cliente!',
    })
  }
}

export default function* rootSaga() {
  yield all([takeEvery(actions.SAVE_CUSTOMER, save)])
}
