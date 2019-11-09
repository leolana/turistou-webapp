import gql from 'graphql-tag'
import { DateTime } from 'luxon'

import { mutate } from 'core/api/apollo'

const actions = {
  SET_STATE: 'excursionDetail/SET_STATE',
  SAVE_EXCURSION: 'excursionDetail/SAVE_EXCURSION',
  SAVE_EXCURSION_FAILURE: 'excursionDetail/SAVE_EXCURSION_FAILURE',
  SAVE_EXCURSION_SUCCESS: 'excursionDetail/SAVE_EXCURSION_SUCCESS',
}

export const saveExcursion = form => {
  const {
    destination,
    departurePoint,
    departureDate,
    departureTime,
    arrivalPoint,
    regressDate,
    regressTime,
    ticketPriceDefault,
    stopPointsKeys,
    stopPoint,
    priceKeys,
    ticketDescription,
    ticketPrice,
    isFrom,
    ageInitial,
    ageFinal,
    untilAge,
    transportsKeys,
    type,
    plate,
    capacity,
    driver,
  } = form

  const payload = {
    destination,
    departurePoint,
    departureDatetime: DateTime.fromObject({
      year: departureDate.year(),
      month: departureDate.month() + 1,
      day: departureDate.date(),
      hour: departureTime.hour(),
      minute: departureTime.minute(),
    }),
    arrivalPoint,
    regressDatetime: DateTime.fromObject({
      year: regressDate.year(),
      month: regressDate.month() + 1,
      day: regressDate.date(),
      hour: regressTime.hour(),
      minute: regressTime.minute(),
    }),
    stoppingPoints: stopPointsKeys.map(k => ({
      stopPoint: stopPoint[k],
    })),
    ticketPriceDefault,
    prices: priceKeys.map(k => ({
      ticketDescription: ticketDescription[k],
      ticketPrice: ticketPrice[k],
      isFrom: isFrom[k],
      ageInitial: ageInitial[k],
      untilAge: untilAge[k],
      ageFinal: ageFinal[k],
    })),
    excursionTransports: transportsKeys.map(k => ({
      type: type[k],
      plate: plate[k],
      capacity: capacity[k],
      driver: driver[k],
    })),
  }

  mutate({
    mutation: gql`
      mutation saveExcursion($input: SaveExcursionInput!) {
        saveExcursion(input: $input) {
          id
        }
      }
    `,
    variables: {
      input: payload,
    },
  })
}

export const saveExcursionSuccess = (payload: any) => ({
  type: actions.SET_STATE,
  payload: payload.excursions,
  isLoading: false,
})

export const saveExcursionFailure = (payload: any) => ({
  type: actions.GET_EXCURSIONS_FAILURE,
  payload: { ...payload },
  isLoading: false,
})

export default actions
