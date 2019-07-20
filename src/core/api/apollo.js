import ApolloClient from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { getIdToken } from 'core/auth'

import config from 'config'

const httpLink = createHttpLink({
  uri: config.api.graphql,
})

const authLink = setContext((_, { headers }) => {
  const token = getIdToken()
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export const query = options => apolloClient.query(options)
export const mutate = options => apolloClient.mutate(options)

export default apolloClient
