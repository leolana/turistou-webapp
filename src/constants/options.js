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
const paymentType = [
  { value: 1, isInstallable: false, label: 'Dinheiro' },
  { value: 2, isInstallable: true, label: 'Cartão de crédito' },
  { value: 3, isInstallable: false, label: 'Cartão de débito' },
  { value: 4, isInstallable: true, label: 'Boleto' },
  { value: 5, isInstallable: false, label: 'Transferência' },
]

exports.genderOptions = genderOptions
exports.typeUserOptions = typeUserOptions
exports.personType = personType
exports.corporateType = corporateType
exports.paymentType = paymentType
