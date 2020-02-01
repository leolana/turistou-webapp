import gql from 'graphql-tag'

import { query, mutate } from 'core/api/apollo'

const actions = {
  SET_STATE: 'payments/SET_STATE',
  SET_STATE_FAILURE: 'payments/SET_STATE_FAILURE',
  GET_PAYMENTS: 'payments/GET_PAYMENTS',
  TOGGLE_VISIBILITY: 'payments/TOGGLE_VISIBILITY',
  TOGGLE_LOADING: 'payments/TOGGLE_LOADING',
  SET_TO_PAID: 'payments/SET_TO_PAID',
  SET_TO_UNPAID: 'payments/SET_TO_UNPAID',
  SET_TO_CANCELED: 'payments/SET_TO_CANCELED',
}

export const fetchPayments = ({ passengerId }) => ({
  type: actions.GET_PAYMENTS,
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
            status
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

export const setToPending = ({ passengerId, paymentId }) => ({
  type: actions.SET_TO_PAID,
  request: () =>
    mutate({
      mutation: gql`
        mutation Passenger($input: UpdatePayDateInput!) {
          setPayDateToPending(updatePayDateInput: $input) {
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

export const setStatusToCanceled = ({ passengerId, paymentId }) => ({
  type: actions.SET_TO_CANCELED,
  request: () =>
    mutate({
      mutation: gql`
        mutation Passenger($input: UpdatePayDateInput!) {
          setStatusPaymentToCanceled(updatePayDateInput: $input) {
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

export const toggleVisibility = payload => ({
  type: actions.TOGGLE_VISIBILITY,
  payload,
})

export const toggleLoading = payload => ({
  type: actions.TOGGLE_LOADING,
  payload,
})

export default actions
