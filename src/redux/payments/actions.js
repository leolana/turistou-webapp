import gql from 'graphql-tag'

import { query, mutate } from 'core/api/apollo'

const actions = {
  SET_STATE: 'payments/SET_STATE',
  SET_STATE_FAILURE: 'payments/SET_STATE_FAILURE',
  GET_PAYMENTS_LIST: 'payments/GET_PAYMENTS_LIST',
  GET_PAYMENTS_UPDATE: 'payments/GET_PAYMENTS_UPDATE',
  TOGGLE_PAYMENTS_LIST_VISIBILITY: 'payments/TOGGLE_PAYMENTS_LIST_VISIBILITY',
  TOGGLE_PAYMENTS_UPDATE_VISIBILITY: 'payments/TOGGLE_PAYMENTS_UPDATE_VISIBILITY',
  TOGGLE_LOADING: 'payments/TOGGLE_LOADING',
  SET_TO_PAID: 'payments/SET_TO_PAID',
  SET_TO_UNPAID: 'payments/SET_TO_UNPAID',
}

export const fetchPayments = ({ passengerId }) => ({
  payload: { loading: true },
  request: () =>
    query({
      query: gql`
        query Passenger($passengerId: String!) {
          payments(passengerId: $passengerId) {
            id
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

export const setToPaid = ({ passengerId, paymentId }) => ({
  type: actions.SET_TO_PAID,
  request: () =>
    mutate({
      mutation: gql`
        mutation Passenger($input: UpdatePayDateInput!) {
          setPayDateToPaid(updatePayDateInput: $input) {
            id
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
        input: {
          passengerId,
          paymentId,
        },
      },
    }),
})

export const setToUnpaid = ({ passengerId, paymentId }) => ({
  type: actions.SET_TO_PAID,
  request: () =>
    mutate({
      mutation: gql`
        mutation Passenger($input: UpdatePayDateInput!) {
          setPayDateToUnpaid(updatePayDateInput: $input) {
            id
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
        input: {
          passengerId,
          paymentId,
        },
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
