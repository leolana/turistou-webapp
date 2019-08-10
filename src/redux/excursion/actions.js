import gql from 'graphql-tag'

import { query } from 'core/api/apollo'

const actions = {
  SET_STATE: 'filter/SET_STATE',
  GET_EXCURSIONS: 'excursion/GET_DATA',
}

const excursionFragment = gql`
  fragment ExcursionFragment on Excursion {
    id
    destination
  }
`

export const fetchExcursions = () => ({
  type: actions.GET_EXCURSIONS,
  loading: true,
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
  loading: false,
  payload: payload.data,
})

export const fetchExcursionsFailed = (payload: any) => ({
  type: actions.SET_STATE,
  loading: false,
  payload: payload.errors[0].message,
})

export const fetchExcursionsError = (error: any) => ({
  type: actions.SET_STATE,
  loading: false,
  payload: error.message,
})

export default actions
