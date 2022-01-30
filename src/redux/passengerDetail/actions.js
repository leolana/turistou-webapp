// @flow
import gql from 'graphql-tag'

const actions = {
  SET_STATE: 'passengerDetail/SET_STATE',
  SET_PAYLOAD: 'passengerDetail/SET_PAYLOAD',
}

export const SAVE_PASSENGER = gql`
  mutation savePassenger($input: SavePassengerInput!) {
    savePassenger(input: $input) {
      id
    }
  }
`

export default actions
