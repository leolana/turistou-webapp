// @flow
import gql from 'graphql-tag'
import { mutate } from 'core/api/apollo'

const actions = {
  SET_STATE: 'passengerStatus/SET_STATE',
  SET_PAYLOAD: 'passengerStatus/SET_PAYLOAD',
  SET_TO_BOOKED: 'passengerStatus/SET_TO_BOOKED',
  SET_TO_CANCELED: 'passengerStatus/SET_TO_CANCELED',
  TOGGLE_REMOVE_PASSENGER_VISIBILITY: 'passengerStatus/TOGGLE_REMOVE_PASSENGER_VISIBILITY',
  TOGGLE_SWAP_PASSENGER_VISIBILITY: 'passengerStatus/TOGGLE_SWAP_PASSENGER_VISIBILITY',
  CLEAR_PASSENGER_STATUS: 'passengerStatus/CLEAR_PASSENGER_STATUS',
  SET_PASSENGER_TO_REMOVE: 'passengerStatus/SET_PASSENGER_TO_REMOVE',
  SET_PASSENGER_TO_SWAP: 'passengerStatus/SET_PASSENGER_TO_SWAP',
  SET_PASSENGER_TO_BE_SWAPPED_WITH: 'passengerStatus/SET_PASSENGER_TO_BE_SWAPPED_WITH',
  SWAP_PASSENGERS: 'passengerStatus/SWAP_PASSENGERS',
}

const statusActions = {
  booked: actions.SET_TO_BOOKED,
  canceled: actions.SET_TO_CANCELED,
}

export const swapPassengersStatus = (passengerId, idOfCustomerToBeSwappedWith) => {
  return {
    type: actions.SWAP_PASSENGERS,
    payload: { loading: true },
    request: () =>
      mutate({
        mutation: gql`
          mutation swapPassengers($input: SwapPassengersInput!) {
            swapPassengers(SwapPassengersInput: $input) {
              id
            }
          }
        `,
        variables: {
          input: {
            id: passengerId,
            idOfCustomerToBeSwappedWith,
          },
        },
      }),
  }
}

const setPassengerStatus = (status) => (passengerId, amountRefunded) => {
  return {
    type: statusActions[status],
    payload: { loading: true },
    request: () =>
      mutate({
        mutation: gql`
          mutation setPassengerStatus($input: SetPassengerStatusInput!) {
            setPassengerStatus(SetPassengerStatusInput: $input) {
              id
              status
            }
          }
        `,
        variables: {
          input: {
            id: passengerId,
            status,
            amountRefunded: amountRefunded || 0,
          },
        },
      }),
  }
}

export const setToBooked = setPassengerStatus('BOOKED')

export const setToCanceled = setPassengerStatus('CANCELED')

export const setToWaiting = setPassengerStatus('WAITING')

export const toggleRemovePassengerVisibility = (payload) => ({
  type: actions.TOGGLE_REMOVE_PASSENGER_VISIBILITY,
  payload,
})

export const toggleSwapPassengerVisibility = (payload) => ({
  type: actions.TOGGLE_SWAP_PASSENGER_VISIBILITY,
  payload,
})

export const clearPassengerStatus = () => ({
  type: actions.CLEAR_PASSENGER_STATUS,
})

export const savePassengerStatusSuccess = (payload: any) => ({
  type: actions.SET_STATE,
  payload: {
    ...payload,
    isRemovePassengerVisible: false,
    isSwapPassengerVisible: false,
  },
})

export const savePassengerStatusFailure = (payload: any) => ({
  type: actions.SET_STATE,
  payload: {
    payload,
    isRemovePassengerVisible: false,
    isSwapPassengerVisible: false,
  },
})

export const setPassengerToRemove = (payload: any) => ({
  payload: { ...payload },
  type: actions.SET_PASSENGER_TO_REMOVE,
})

export const setPassengerToSwap = (payload: any) => ({
  payload: { ...payload },
  type: actions.SET_PASSENGER_TO_SWAP,
})

export const setPassengerToBeSwappedWith = (payload: any) => ({
  payload: { ...payload },
  type: actions.SET_PASSENGER_TO_BE_SWAPPED_WITH,
})

export default actions
