// @flow
import gql from 'graphql-tag'
import { mutate } from 'core/api/apollo'

const actions = {
  SET_STATE: 'passengerStatus/SET_STATE',
  SAVE_STATUS_FAILURE: 'passengerStatus/SET_STATE_FAILURE',
  SET_TO_BOOKED: 'passengerStatus/SET_TO_BOOKED',
  SET_TO_CANCELED: 'passengerStatus/SET_TO_CANCELED',
}

const statusActions = {
  booked: actions.SET_TO_BOOKED,
  canceled: actions.SET_TO_CANCELED,
}

const setPassengerStatus = (status) => (passengerId) => ({
  type: statusActions[status],
  payload: { loading: true },
  request: () =>
    mutate({
      mutation: gql`
        mutation Passenger($input: SetPassengersStatusInput!) {
          setPassengerStatus(SetPassengersStatusInput: $input) {
            id
            status
          }
        }
      `,
      variables: {
        input: {
          id: passengerId,
          status,
        },
      },
    }),
})

export const setToBooked = setPassengerStatus('BOOKED')

export const setToCanceled = setPassengerStatus('CANCELED')

export const savePassengerStatusSuccess = (payload: any) => ({
  payload: { ...payload },
  type: actions.SET_STATE,
  isLoading: false,
})

export const savePassengerStatusFailure = (payload: any) => ({
  type: actions.SAVE_STATUS_FAILURE,
  payload: { ...payload },
  isLoading: false,
})

export default actions
