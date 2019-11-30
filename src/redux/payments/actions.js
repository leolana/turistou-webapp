import gql from 'graphql-tag'

import { query } from 'core/api/apollo'

const actions = {
  SET_STATE: 'payments/SET_STATE',
  GET_PAYMENTS_LIST: 'payments/GET_PAYMENTS_LIST',
  GET_PAYMENTS_UPDATE: 'payments/GET_PAYMENTS_UPDATE',
  GET_PAYMENTS_SUCCESS: 'payments/GET_PAYMENTS_SUCCESS',
  GET_PAYMENTS_FAILURE: 'payments/GET_PAYMENTS_FAILURE',
  TOGGLE_PAYMENTS_LIST_VISIBILITY: 'payments/TOGGLE_PAYMENTS_LIST_VISIBILITY',
  TOGGLE_PAYMENTS_UPDATE_VISIBILITY: 'payments/TOGGLE_PAYMENTS_UPDATE_VISIBILITY',
  TOGGLE_LOADING: 'payments/TOGGLE_LOADING',
}

export const fetchPayments = ({ passengerId }) => ({
  payload: { loading: true },
  request: () =>
    query({
      query: gql`
        query Passenger($passengerId: String!) {
          payments(passengerId: $passengerId) {
            dueDate
            payDate
            value
            createdAt
            updatedAt
            operation
          }
        }
      `,
      variables: {
        passengerId,
      },
    }),
})

export const fetchPaymentsSuccess = payload => ({
  type: actions.SET_STATE,
  payload: payload.payments,
  isLoading: false,
})

export const fetchPaymentsFailure = payload => ({
  type: actions.GET_PAYMENTS_FAILURE,
  payload: { ...payload },
  isLoading: false,
})

export const togglePaymentListVisibility = payload => ({
  type: actions.TOGGLE_PAYMENTS_LIST_VISIBILITY,
  payload,
})

export const togglePaymentsUpdateVisibility = payload => ({
  type: actions.TOGGLE_PAYMENTS_UPDATE_VISIBILITY,
  payload,
})

export const toggleLoading = payload => ({
  type: actions.TOGGLE_LOADING,
  payload,
})

export default actions
