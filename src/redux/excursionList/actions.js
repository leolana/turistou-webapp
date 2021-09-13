import gql from 'graphql-tag'

const actions = {
  SET_STATE: 'excursionList/SET_STATE',
  GET_EXCURSIONS_FAILURE: 'excursionList/GET_EXCURSIONS_FAILURE',
  DELETE_EXCURSION: 'excursionList/DELETE_DATA',
  DELETE_EXCURSION_SUCCESS: 'excursionList/DELETE_DATA_SUCCESS',
  DELETE_EXCURSION_FAILURE: 'excursionList/DELETE_DATA_FAILURE',
}

const excursionFragment = gql`
  fragment ExcursionFragment on Excursion {
    id
    destination
    departureDate
    regressDate
    transports {
      capacity
    }
    passengers {
      id
      spot {
        number
        transportId
      }
    }
    ticketPriceDefault
    ticketPrices {
      id
      description
      price
      # ageInitial
      # ageFinal
    }
  }
`

export const FETCH_EXCURSIONS = gql`
  {
    excursions {
      ...ExcursionFragment
    }
  }
  ${excursionFragment}
`

export const DELETE_EXCURSION = gql`
  mutation deleteExcursion($id: String!) {
    deleteExcursion(id: $id)
  }
`
export default actions
