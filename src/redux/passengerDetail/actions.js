import gql from 'graphql-tag'
import { mutate } from '@core/api/apollo'

const actions = {
  SET_STATE: 'passengerDetail/SET_STATE',
  SET_PAYLOAD: 'passengerDetail/SET_PAYLOAD',
  SAVE_PASSENGER: 'passengerDetail/SAVE_PASSENGER',
  SAVE_PASSENGER_FAILURE: 'passengerDetail/SAVE_PASSENGER_FAILURE',
  SAVE_PASSENGER_SUCCESS: 'passengerDetail/SAVE_PASSENGER_SUCCESS',
}

export const savePassenger = (form) => {
  const { ...dest } = form
  const payload = {
    ...dest,
    status: 'BOOKED', // TODO:
  }

  return mutate({
    mutation: gql`
      mutation savePassenger($input: SavePassengerInput!) {
        savePassenger(input: $input) {
          id
        }
      }
    `,
    variables: {
      input: payload,
    },
  })
}

export const savePassengerSuccess = (payload) => ({
  payload: { ...payload },
  type: actions.SET_STATE,
  isLoading: false,
})

export const savePassengerFailure = (payload) => ({
  type: actions.SAVE_PASSENGER_FAILURE,
  payload: { ...payload },
  isLoading: false,
})

export default actions
