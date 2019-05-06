const genderOptions = [
  { value: 'F', label: 'Feminino' },
  { value: 'M', label: 'Masculino' },
  { value: '-', label: 'Outro' },
]
const typeUserOptions = [
  { value: 'F', label: 'Pessoa física' },
  { value: 'J', label: 'Pessoa jurídica' },
]
const personType = [
  { value: 1, label: 'Guia de turismo' },
  { value: 2, label: 'Agente de turismo' },
  { value: 0, label: 'Outros' },
]
const corporateType = [
  { value: 1, label: 'Microempreendedor' },
  { value: 2, label: 'Agencia de turismo' },
  { value: 0, label: 'Outros' },
]

exports.genderOptions = genderOptions
exports.typeUserOptions = typeUserOptions
exports.personType = personType
exports.corporateType = corporateType
