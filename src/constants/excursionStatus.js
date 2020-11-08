export const EXCURSION_STATUS = [
  {
    id: 3,
    key: 'next',
    description: 'Futuras',
  },
  {
    id: 1,
    key: 'done',
    description: 'Concluídas',
  },
]

export const EXCURSION_STATUS_ENUM = (() => {
  const statusEnum = {}
  EXCURSION_STATUS.forEach((x) => {
    statusEnum[x.key] = x.id
  })
  return statusEnum
})()
