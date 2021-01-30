import { getOsEnv } from '@core/environment'

const config = {
  app: {
    url: getOsEnv('REACT_APP_URI'),
  },
  auth0: {
    domain: getOsEnv('REACT_APP_AUTH0_DOMAIN'),
    clientId: getOsEnv('REACT_APP_AUTH0_CLIENT_ID'),
    audience: getOsEnv('REACT_APP_AUTH0_AUDIENCE'),
  },
  api: {
    graphql: getOsEnv('REACT_APP_GRAPHQL_API'),
  },
}

export default config
