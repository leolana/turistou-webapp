import gql from 'graphql-tag'

import { query } from 'core/api/apollo'

const actions = {
  SET_STATE: 'passenger/SET_STATE',
  GET_PASSENGERS: 'passenger/GET_PASSENGERS',
  GET_PASSENGERS_SUCCESS: 'passenger/GET_PASSENGERS_SUCCESS',
}

const passengerFragment = gql`
  fragment PassengerFragment on Passenger {
    id
    spot
    status
    customer {
      name
    }
  }
`
export const fetchPassengers = () => ({
  type: actions.GET_PASSENGERS,
  payload: { loading: true },
  request: () =>
    query({
      query: gql`
        {
          passengers {
            ...PassengerFragment
          }
        }
        ${passengerFragment}
      `,
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
