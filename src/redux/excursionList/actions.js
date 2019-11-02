import gql from 'graphql-tag'

import { query } from 'core/api/apollo'

const actions = {
  // TODO: ajustar os nomes e padronizar
  SET_STATE: 'excursionList/SET_STATE',
  GET_EXCURSIONS: 'excursionList/GET_DATA',
  GET_EXCURSIONS_FAILURE: 'excursionList/GET_EXCURSIONS_FAILURE',
  GET_DATA: 'excursionList/GET_DATA',
  GET_DATA_SUCCESS: 'excursionList/GET_DATA_SUCCESS',
  DELETE_DATA: 'excursionList/DELETE_DATA',
  DELETE_DATA_SUCCESS: 'excursionList/DELETE_DATA_SUCCESS',
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
      spot
    }
  }
`

export const fetchExcursions = () => ({
  type: actions.GET_EXCURSIONS,
  payload: { loading: true },
  request: () =>
    query({
      query: gql`
        {
          excursions {
            ...ExcursionFragment
          }
        }
        ${excursionFragment}
      `,
    }),
})

export const fetchExcursionsSuccess = (payload: any) => ({
  type: actions.SET_STATE,
  payload: payload.excursions,
  isLoading: false,
})

export const fetchExcursionsFailure = (payload: any) => ({
  type: actions.GET_EXCURSIONS_FAILURE,
  payload: { ...payload },
  isLoading: false,
})

export default actions
