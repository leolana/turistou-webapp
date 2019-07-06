export const EXCURSION_STATUS = [
  // {
  //   id: 0,
  //   key: 'all',
  //   description: 'Todas',
  // },
  {
    id: 1,
    key: 'done',
    description: 'Concluídas',
  },
  // {
  //   id: 2,
  //   key: 'current',
  //   description: 'Atuais',
  // },
  {
    id: 3,
    key: 'nexties',
    description: 'Futuras',
  },
]

export const EXCURSION_STATUS_ENUM = (() => {
  const statusEnum = {}
  EXCURSION_STATUS.forEach(x => {
    statusEnum[x.key] = x.id
  })
  return statusEnum
})()
