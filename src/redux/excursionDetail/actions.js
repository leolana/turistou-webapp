import gql from 'graphql-tag'

import { mutate } from 'core/api/apollo'

const actions = {
  SET_STATE: 'excursionDetail/SET_STATE',
  SAVE_EXCURSION: 'excursionDetail/SAVE_EXCURSION',
  SAVE_EXCURSION_FAILURE: 'excursionDetail/SAVE_EXCURSION_FAILURE',
  SAVE_EXCURSION_SUCCESS: 'excursionDetail/SAVE_EXCURSION_SUCCESS',
}

export const saveExcursion = payload =>
  mutate({
    mutation: gql`
      mutation saveExcursion($input: SaveExcursionInput!) {
        saveExcursion(input: $input) {
          id
        }
      }
    `,
    variables: {
      input: payload,
    },
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
