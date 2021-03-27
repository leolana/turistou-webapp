import gql from 'graphql-tag'

import { query } from 'core/api/apollo'

const actions = {
  SET_STATE: 'passengerToSwapList/SET_STATE',
  GET_PASSENGERS: 'passengerToSwapList/GET_PASSENGERS',
  GET_PASSENGERS_SUCCESS: 'passengerToSwapList/GET_PASSENGERS_SUCCESS',
}

const passengerFragment = gql`
  fragment PassengerFragment on Passenger {
    id
    customer {
      name
      document {
        documentNumber
      }
      address {
        city
      }
    }
  }
`
export const fetchPassengersToSwap = (excursionId) => ({
  type: actions.GET_PASSENGERS,
  payload: { isLoading: true },
  request: () =>
    query({
      query: gql`
        query Passenger($filter: SearchPassengersInput!) {
          passengers(filter: $filter) {
            ...PassengerFragment
          }
        }
        ${passengerFragment}
      `,
      variables: {
        filter: {
          excursionId,
          status: 'WAITING',
          startPay: false,
          fullPay: false,
        },
      },
    }),
})

export const fetchPassengersSuccess = ({ passengers }) => ({
  type: actions.SET_STATE,
  payload: {
    payload: passengers,
    isLoading: false,
  },
})

export const fetchPassengersFailure = () => ({
  type: actions.SET_STATE,
  payload: { isLoading: false },
})

export default actions
