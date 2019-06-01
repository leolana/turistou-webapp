import { getOsEnv } from './services/environment'

const config = {
  app: {
    url: getOsEnv('REACT_APP_URI'),
  },
  auth0: {
    domain: getOsEnv('REACT_APP_AUTH0_DOMAIN'),
    clientId: getOsEnv('REACT_APP_AUTH0_CLIENT_ID'),
    audience: getOsEnv('REACT_APP_AUTH0_AUDIENCE'),
  },
}

export default config
