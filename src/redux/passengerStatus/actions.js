// @flow
import gql from 'graphql-tag'
import { mutate } from 'core/api/apollo'

const actions = {
  SET_STATE: 'passengerStatus/SET_STATE',
  SET_PAYLOAD: 'passengerStatus/SET_PAYLOAD',
  TOGGLE_REMOVE_PASSENGER_VISIBILITY: 'passengerStatus/TOGGLE_REMOVE_PASSENGER_VISIBILITY',
  TOGGLE_SWAP_PASSENGER_VISIBILITY: 'passengerStatus/TOGGLE_SWAP_PASSENGER_VISIBILITY',
  CLEAR_PASSENGER_STATUS: 'passengerStatus/CLEAR_PASSENGER_STATUS',
  SET_PASSENGER_TO_REMOVE: 'passengerStatus/SET_PASSENGER_TO_REMOVE',
  SET_PASSENGER_TO_SWAP: 'passengerStatus/SET_PASSENGER_TO_SWAP',
  SET_PASSENGER_TO_BE_SWAPPED_WITH: 'passengerStatus/SET_PASSENGER_TO_BE_SWAPPED_WITH',
}

export const SET_PASSENGER_STATUS = gql`
  mutation setPassengerStatus($input: SetPassengerStatusInput!) {
    setPassengerStatus(SetPassengerStatusInput: $input) {
      id
      status
    }
  }
`

export const SWAP_PASSENGERS = gql`
  mutation swapPassengers($input: SwapPassengersInput!) {
    swapPassengers(SwapPassengersInput: $input) {
      id
    }
  }
`

export const swapPassengersStatus = (passengerId, idOfCustomerToBeSwappedWith) => {
  return {
    type: actions.SWAP_PASSENGERS,
    payload: { loading: true },
    request: () =>
      mutate({
        mutation: SWAP_PASSENGERS,
        variables: {
          input: {
            id: passengerId,
            idOfCustomerToBeSwappedWith,
          },
        },
      }),
  }
}

export const clearPassengerStatus = () => ({
  type: actions.CLEAR_PASSENGER_STATUS,
})

export default actions
