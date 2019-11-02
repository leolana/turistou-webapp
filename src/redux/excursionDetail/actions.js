import gql from 'graphql-tag'

import { query } from 'core/api/apollo'

const actions = {
  SET_STATE: 'excursionDetail/SET_STATE',
  SAVE_EXCURSION: 'excursionDetail/SAVE_EXCURSION',
  SAVE_EXCURSION_FAILURE: 'excursionDetail/SAVE_EXCURSION_FAILURE',
  SAVE_EXCURSION_SUCCESS: 'excursionDetail/SAVE_EXCURSION_SUCCESS',
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

export const saveExcursion = () => ({
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

export const saveExcursionSuccess = (payload: any) => ({
  type: actions.SET_STATE,
  payload: payload.excursions,
  isLoading: false,
})

export const saveExcursionFailure = (payload: any) => ({
  type: actions.GET_EXCURSIONS_FAILURE,
  payload: { ...payload },
  isLoading: false,
})

export default actions
