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
  request: query({
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

export default actions
