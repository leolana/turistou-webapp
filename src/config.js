import { getOsEnv } from './services/environment'

const config = {
  app: {
    url: getOsEnv('APP_URI'),
  },
  auth0: {
    domain: getOsEnv('AUTH0_DOMAIN'),
    clientId: getOsEnv('AUTH0_CLIENT_ID'),
    audience: getOsEnv('AUTH0_AUDIENCE'),
  },
}

export default config
