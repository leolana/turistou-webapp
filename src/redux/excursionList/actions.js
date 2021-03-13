import gql from 'graphql-tag'

import { mutate } from 'core/api/apollo'

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

export const fetchExcursions = gql`
  {
    excursions {
      ...ExcursionFragment
    }
  }
  ${excursionFragment}
`

export const deleteExcursion = (id) => ({
  type: actions.DELETE_EXCURSION,
  payload: { loading: true },
  request: () =>
    mutate({
      mutation: gql`
        mutation deleteExcursion($id: String!) {
          deleteExcursion(id: $id)
        }
      `,
      variables: {
        id,
      },
    }),
})

export const deleteExcursionsSuccess = (id) => ({
  type: actions.DELETE_EXCURSION_SUCCESS,
  payload: {
    id,
  },
})

export const deleteExcursionsFailure = () => ({
  type: actions.DELETE_EXCURSIONS_FAILURE,
  payload: {
    isLoading: false,
  },
})

export default actions
