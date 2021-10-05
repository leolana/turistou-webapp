import gql from 'graphql-tag'

const actions = {
  SET_STATE: 'passengerList/SET_STATE',
}

export const setPassengerListState = (payload) => ({
  type: actions.SET_STATE,
  payload,
})

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
        number
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
export const FETCH_PASSENGERS = gql`
  query Passenger($filter: SearchPassengersInput!) {
    passengers(filter: $filter) {
      ...PassengerFragment
    }
  }
  ${passengerFragment}
`

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
