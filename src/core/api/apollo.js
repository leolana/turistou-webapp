import ApolloClient from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { getIdToken } from 'core/auth'

import config from 'config'

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
    )
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
  }
})

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

const link = ApolloLink.from([errorLink, authLink, httpLink])

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

export const query = options =>
  apolloClient
    .query(options)
    .then(response => {
      console.log('then')
      console.log(response)
      return { response }
    })
    .catch(error => ({ error }))

export const mutate = options =>
  apolloClient
    .mutate(options)
    .then(response => {
      console.log('then')
      console.log(response)
      return { data: response }
    })
    .catch(error => ({ error }))

export default apolloClient
