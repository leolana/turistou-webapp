export function getOsEnv(key) {
  if (typeof process.env[key] === 'undefined') {
    throw new Error(`Environment variable ${key} is not set.`)
  }

  return process.env[key]
}

export function getOsEnvOptional(key) {
  return process.env[key]
}

export function toNumber(value) {
  return parseInt(value, 10)
}

export function toBool(value) {
  return value === 'true'
}
