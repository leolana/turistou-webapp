import gql from 'graphql-tag'

import { query, mutate } from 'core/api/apollo'

const actions = {
  SET_STATE: 'paymentForm/SET_STATE',
  SET_STATE_FAILURE: 'paymentForm/SET_STATE_FAILURE',
  GET_PAYMENT_STATUS: 'paymentForm/GET_PAYMENT_STATUS',
  TOGGLE_VISIBILITY: 'paymentForm/TOGGLE_VISIBILITY',
  TOGGLE_LOADING: 'paymentForm/TOGGLE_LOADING',
  PAYMENT_INSERT: 'paymentForm/PAYMENT_INSERT',
  CLEAR_PAYMENT_STATUS: 'paymentForm/CLEAR_PAYMENT_STATUS',
}

export const paymentInsert = ({ passengerId, payment }) => ({
  type: actions.PAYMENT_INSERT,
  request: () =>
    mutate({
      mutation: gql`
        mutation Passenger($input: PaymentInsertInput!) {
          paymentInsert(paymentInsertInput: $input) {
            id
          }
        }
      `,
      variables: {
        input: {
          passengerId,
          payment,
        },
      },
    }),
})

export const fetchPaymentStatus = ({ passengerId }) => ({
  payload: { loading: true },
  request: () =>
    query({
      query: gql`
        query Passenger($passengerId: String!) {
          paymentStatus(passengerId: $passengerId) {
            amountPaid
            remaining
            previousPaid
            passengerId
          }
        }
      `,
      variables: {
        passengerId,
      },
    }),
})

export const setStateSuccess = payload => ({
  type: actions.SET_STATE,
  payload,
  isLoading: false,
})

export const setStateFailure = payload => ({
  type: actions.SET_STATE_FAILURE,
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

export const clearPaymentStatus = () => ({
  type: actions.CLEAR_PAYMENT_STATUS,
})

export default actions
