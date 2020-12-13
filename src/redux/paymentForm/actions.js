import gql from 'graphql-tag'

import { query } from '@core/api/apollo'

const actions = {
  SET_STATE: 'paymentStatus/SET_STATE',
  SET_STATE_FAILURE: 'paymentStatus/SET_STATE_FAILURE',
  GET_PAYMENT_STATUS: 'paymentStatus/GET_PAYMENT_STATUS',
  TOGGLE_VISIBILITY: 'paymentStatus/TOGGLE_VISIBILITY',
  TOGGLE_LOADING: 'paymentStatus/TOGGLE_LOADING',
}

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

export const setStateSuccess = (payload) => ({
  type: actions.SET_STATE,
  payload,
  isLoading: false,
})

export const setStateFailure = (payload) => ({
  type: actions.SET_STATE_FAILURE,
  payload: { ...payload },
  isLoading: false,
})

export const toggleVisibility = (payload) => ({
  type: actions.TOGGLE_VISIBILITY,
  payload,
})

export const toggleLoading = (payload) => ({
  type: actions.TOGGLE_LOADING,
  payload,
})

export default actions
