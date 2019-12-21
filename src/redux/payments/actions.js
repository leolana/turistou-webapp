import gql from 'graphql-tag'

import { query } from 'core/api/apollo'

const actions = {
  SET_STATE: 'payments/SET_STATE',
  GET_PAYMENTS: 'payments/GET_PAYMENTS',
  GET_PAYMENTS_SUCCESS: 'payments/GET_PAYMENTS_SUCCESS',
  GET_PASSENGERS_FAILURE: 'payments/GET_PASSENGERS_FAILURE',
  TOGGLE_VISIBILITY: 'payments/TOGGLE_VISIBILITY',
  TOGGLE_LOADING: 'payments/TOGGLE_LOADING',
}

export const fetchPayments = ({ passengerId }) => ({
  type: actions.GET_PAYMENTS,
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
            method
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
  type: actions.GET_PASSENGERS_FAILURE,
  payload: { ...payload },
  isLoading: false,
})

export const toggleVisibility = payload => ({
  type: actions.TOGGLE_VISIBILITY,
  payload,
})

export const toggleLoading = payload => ({
  type: actions.TOGGLE_LOADING,
  payload,
})

export default actions
