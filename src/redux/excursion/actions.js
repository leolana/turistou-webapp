import gql from 'graphql-tag'

import { query } from 'core/api/apollo'

const actions = {
  SET_STATE: 'filter/SET_STATE',
  GET_EXCURSIONS: 'excursion/GET_DATA',
  GET_EXCURSIONS_FAILURE: 'excursion/GET_EXCURSIONS_FAILURE',
}

const excursionFragment = gql`
  fragment ExcursionFragment on Excursion {
    id
    destination
    departureDate
    regressDate
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
  payload: { ...payload.data, loading: false },
})

export const fetchExcursionsFailure = (payload: any) => ({
  type: actions.GET_EXCURSIONS_FAILURE,
  payload: { ...payload, loading: false },
})

export default actions
