// @flow
import gql from 'graphql-tag'

const actions = {
  SET_STATE: 'passengerDetail/SET_STATE',
  SET_PAYLOAD: 'passengerDetail/SET_PAYLOAD',
  SAVE_PASSENGER_FAILURE: 'passengerDetail/SAVE_PASSENGER_FAILURE',
  SAVE_PASSENGER_SUCCESS: 'passengerDetail/SAVE_PASSENGER_SUCCESS',
}

export const SAVE_PASSENGER = gql`
  mutation savePassenger($input: SavePassengerInput!) {
    savePassenger(input: $input) {
      id
    }
  }
`

export const savePassengerSuccess = (payload: any) => ({
  payload: { ...payload },
  type: actions.SET_STATE,
  isLoading: false,
})

export const savePassengerFailure = (payload: any) => ({
  type: actions.SAVE_PASSENGER_FAILURE,
  payload: { ...payload },
  isLoading: false,
})

export default actions
