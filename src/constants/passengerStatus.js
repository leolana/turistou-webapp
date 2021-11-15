export const PASSENGER_STATUS = [
  {
    id: 1,
    value: 'BOOKED',
    description: 'Reservado',
    type: 'success',
  },
  {
    id: 2,
    value: 'WAITING',
    description: 'Em espera',
    type: 'warning',
  },
  {
    id: 3,
    value: 'CANCELED',
    description: 'Desistência',
    type: 'danger',
  },
]

export const PASSENGER_STATUS_ENUM = {
  booked: 'BOOKED',
  waiting: 'WAITING',
  canceled: 'CANCELED',
}
