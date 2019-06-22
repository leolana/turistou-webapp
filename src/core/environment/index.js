// @flow
export function getOsEnv(key: string) {
  if (typeof process.env[key] === 'undefined') {
    throw new Error(`Environment variable ${key} is not set.`)
  }

  return process.env[key]
}

export function getOsEnvOptional(key: string) {
  return process.env[key]
}

export function toNumber(value: string): number {
  return parseInt(value, 10)
}

export function toBool(value: string): boolean {
  return value === 'true'
}
