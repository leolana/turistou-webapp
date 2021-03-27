// @flow
import gql from 'graphql-tag'
import { mutate } from 'core/api/apollo'

const actions = {
  SET_STATE: 'passengerStatus/SET_STATE',
  SAVE_STATUS_SUCCESS: 'passengerStatus/SAVE_STATUS_SUCCESS',
  SAVE_STATUS_FAILURE: 'passengerStatus/SET_STATE_FAILURE',
  SET_PAYLOAD: 'passengerStatus/SET_PAYLOAD',
  SET_TO_BOOKED: 'passengerStatus/SET_TO_BOOKED',
  SET_TO_CANCELED: 'passengerStatus/SET_TO_CANCELED',
  TOGGLE_VISIBILITY: 'passengerStatus/TOGGLE_VISIBILITY',
  CLEAR_PASSENGER_STATUS: 'passengerStatus/CLEAR_PASSENGER_STATUS',
  SET_PASSENGER_TO_CHANGE_STATUS: 'passengerStatus/SET_PASSENGER_TO_CHANGE_STATUS',
}

const statusActions = {
  booked: actions.SET_TO_BOOKED,
  canceled: actions.SET_TO_CANCELED,
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

export const toggleVisibility = (payload) => ({
  type: actions.TOGGLE_VISIBILITY,
  payload,
})

export const clearPassengerStatus = () => ({
  type: actions.CLEAR_PASSENGER_STATUS,
})

export const savePassengerStatusSuccess = (payload: any) => ({
  payload: { ...payload },
  type: actions.SAVE_STATUS_SUCCESS,
  isLoading: false,
})

export const savePassengerStatusFailure = (payload: any) => ({
  type: actions.SAVE_STATUS_FAILURE,
  payload: { ...payload },
  isLoading: false,
})

export const setPassengerToChangeStatus = (payload: any) => ({
  payload: { ...payload },
  type: actions.SET_PASSENGER_TO_CHANGE_STATUS,
})

export default actions
