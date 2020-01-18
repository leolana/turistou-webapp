import gql from 'graphql-tag'

import { query } from 'core/api/apollo'

const actions = {
  SET_STATE: 'passengerList/SET_STATE',
  GET_PASSENGERS: 'passengerList/GET_PASSENGERS',
  GET_PASSENGERS_SUCCESS: 'passengerList/GET_PASSENGERS_SUCCESS',
}

const passengerFragment = gql`
  fragment PassengerFragment on Passenger {
    id
    spot
    status
    customer {
      name
    }
    ticketPrice {
      description
      price
    }
    amountPaid
  }
`
export const fetchPassengers = ({ filter }) => ({
  type: actions.GET_PASSENGERS,
  payload: { loading: true },
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
        filter,
      },
    }),
})

export const fetchPassengersSuccess = (payload: any) => ({
  type: actions.SET_STATE,
  payload: payload.passengers,
  isLoading: false,
})

export const fetchPassengersFailure = (payload: any) => ({
  type: actions.GET_PASSENGERS_FAILURE,
  payload: { ...payload },
  isLoading: false,
})

export default actions
