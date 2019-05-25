const EXCURSION_STATUS = [
  {
    id: 0,
    key: 'all',
    description: 'Todas',
  },
  {
    id: 1,
    key: 'done',
    description: 'Concluídas',
  },
  {
    id: 2,
    key: 'current',
    description: 'Atuais',
  },
  {
    id: 3,
    key: 'nexties',
    description: 'Futuras',
  },
]

const EXCURSION_STATUS_ENUM = (() => {
  const statusEnum = {}
  EXCURSION_STATUS.forEach(x => {
    statusEnum[x.key] = x.id
  })
  return statusEnum
})()

exports.EXCURSION_STATUS = EXCURSION_STATUS
exports.EXCURSION_STATUS_ENUM = EXCURSION_STATUS_ENUM
