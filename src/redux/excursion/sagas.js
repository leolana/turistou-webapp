import { all, put, call } from 'redux-saga/effects'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import gql from 'graphql-tag'

export const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: 'http://localhost:4000/graphql' }),
})

const fetchProperty = ({ id }) =>
  apolloClient.query({
    query: gql`
      query FetchProperty($id: ID!) {
        fetchProperty(id: $id) {
          ...PropertyAttributes
          rooms {
            ...RoomAttributes
          }
        }
      }
    `,
    variables: {
      id,
    },
  })

export function* SET_STATE() {
  const result = yield call(fetchProperty)

  yield put({
    type: 'filter/SET_STATE',
    payload: result,
  })
}

export default function* rootSaga() {
  yield all([
    SET_STATE(), // run once on app load to fetch menu data
  ])
}
