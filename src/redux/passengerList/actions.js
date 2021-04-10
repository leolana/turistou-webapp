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
    spot {
      number
      transportId
    }
    status
    customer {
      name
      document {
        documentNumber
      }
      address {
        city
      }
    }
    ticketPrice {
      description
      price
    }
    amountPaid
    amountRefunded
  }
`
export const fetchPassengers = (filter) => ({
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
        filter,
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
