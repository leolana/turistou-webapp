import gql from 'graphql-tag'

import { query, mutate } from 'core/api/apollo'

const actions = {
  SET_STATE: 'paymentForm/SET_STATE',
  TOGGLE_VISIBILITY: 'paymentForm/TOGGLE_VISIBILITY',
  CLEAR_PAYMENT_STATUS: 'paymentForm/CLEAR_PAYMENT_STATUS',
}

export const PAYMENT_INSERT = gql`
  mutation Passenger($input: PaymentInsertInput!) {
    paymentInsert(paymentInsertInput: $input) {
      id
    }
  }
`

export const paymentInsert = ({ passengerId, payment }) => ({
  type: actions.PAYMENT_INSERT,
  request: () =>
    mutate({
      mutation: PAYMENT_INSERT,
      variables: {
        input: {
          passengerId,
          payment,
        },
      },
    }),
})

export const GET_PAYMENT_STATUS = gql`
  query Passenger($passengerId: String!) {
    paymentStatus(passengerId: $passengerId) {
      amountPaid
      remaining
      previousPaid
      passengerId
    }
  }
`

export const fetchPaymentStatus = ({ passengerId }) => ({
  payload: { loading: true },
  request: () =>
    query({
      query: GET_PAYMENT_STATUS,
      variables: {
        passengerId,
      },
    }),
})

export const setState = (payload) => ({
  type: actions.SET_STATE,
  payload,
})

export const toggleVisibility = (payload) => ({
  type: actions.TOGGLE_VISIBILITY,
  payload,
})

export const clearPaymentStatus = () => ({
  type: actions.CLEAR_PAYMENT_STATUS,
})

export default actions
