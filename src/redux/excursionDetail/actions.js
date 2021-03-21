// @flow
import gql from 'graphql-tag'
import { DateTime } from 'luxon'

import { query } from 'core/api/apollo'

const actions = {
  SET_STATE: 'excursionDetail/SET_STATE',
  CLEAR_STATE: 'excursionDetail/CLEAR_STATE',
  GET_EXCURSION_BY_ID: 'excursionDetail/GET_EXCURSION_BY_ID',
  GET_EXCURSION_BY_ID_FAILURE: 'excursionDetail/GET_EXCURSION_BY_ID_FAILURE',
  GET_EXCURSION_BY_ID_SUCCESS: 'excursionDetail/GET_EXCURSION_BY_ID_SUCCESS',
}

export const setExcursionState = (payload) => ({
  type: actions.SET_STATE,
  payload,
})

export const clearExcursionState = () => ({
  type: actions.CLEAR_STATE,
})

export const SAVE_EXCURSION = gql`
  mutation saveExcursion($input: SaveExcursionInput!) {
    saveExcursion(input: $input) {
      id
    }
  }
`

export const getExcursionById = (id: string) => ({
  type: actions.GET_EXCURSION_BY_ID,
  payload: { loading: true },
  request: () =>
    query({
      query: gql`
        query Excursion($id: String!) {
          excursion(id: $id) {
            id
            destination
            departureDate
            departurePoint
            arrivalPoint
            regressDate
            ticketPriceDefault
            ticketPrices {
              id
              description
              price
              ageInitial
              ageFinal
            }
            transports {
              id
              type
              plate
              capacity
              drivers {
                name
              }
            }
            passengers {
              id
              spot {
                number
                transportId
              }
            }
            stopPoints {
              id
              stopPoint
            }
          }
        }
      `,
      variables: { id },
    }),
})

export const getExcursionByIdSuccess = (payload: any) => ({
  type: actions.GET_EXCURSION_BY_ID_SUCCESS,
  payload: payload.excursion,
  isLoading: false,
})

export const getExcursionByIdFailure = () => ({
  type: actions.SET_STATE,
  payload: {
    isLoading: false,
    error: true,
  },
  isLoading: false,
})

export const sequelizeExcursionDetail = (form) => {
  const {
    departureDate,
    departureTime,
    regressDate,
    regressTime,
    ticketPrices,
    stopPoints,
    ...rest
  } = form

  const payload = {
    ...rest,
    departureDatetime:
      departureDate &&
      DateTime.fromObject({
        year: departureDate.year(),
        month: departureDate.month() + 1,
        day: departureDate.date(),
        hour: departureTime?.hour() || 0,
        minute: departureTime?.minute() || 0,
      }),
    regressDatetime:
      regressDate &&
      DateTime.fromObject({
        year: regressDate.year(),
        month: regressDate.month() + 1,
        day: regressDate.date(),
        hour: regressTime?.hour() || 0,
        minute: regressTime?.minute() || 0,
      }),
    ticketPrices: ticketPrices
      ?.filter((s) => !s.deleted)
      .map((t) => {
        const { isFrom, untilAge, ageInitial, ageFinal, ...prices } = t

        return {
          ...prices,
          ageInitial: isFrom ? ageInitial : null,
          ageFinal: untilAge ? ageFinal : null,
        }
      }),
    stopPoints: stopPoints?.filter((s) => !s.deleted).map((s) => ({ ...s })),
  }

  return payload
}

export default actions
