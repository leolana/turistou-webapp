import gql from 'graphql-tag'

import { query, mutate } from 'core/api/apollo'

const actions = {
  SET_STATE: 'payments/SET_STATE',
  GET_PAYMENTS: 'payments/GET_PAYMENTS',
  GET_PAYMENTS_SUCCESS: 'payments/GET_PAYMENTS_SUCCESS',
  GET_PASSENGERS_FAILURE: 'payments/GET_PASSENGERS_FAILURE',
  TOGGLE_VISIBILITY: 'payments/TOGGLE_VISIBILITY',
  TOGGLE_LOADING: 'payments/TOGGLE_LOADING',
  SET_TO_PAID: 'payments/SET_TO_PAID',
  SET_TO_UNPAID: 'payments/SET_TO_UNPAID',
}

export const fetchPayments = ({ passengerId }) => ({
  type: actions.GET_PAYMENTS,
  payload: { loading: true, passengerId },
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
