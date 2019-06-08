export const genderOptions = [
  { value: 'F', label: 'Feminino' },
  { value: 'M', label: 'Masculino' },
  { value: '-', label: 'Outro' },
]

export const typeUserOptions = [
  { value: 'F', label: 'Pessoa física' },
  { value: 'J', label: 'Pessoa jurídica' },
]

export const personType = [
  { value: 1, label: 'Guia de turismo' },
  { value: 2, label: 'Agente de turismo' },
  { value: 0, label: 'Outros' },
]

export const corporateType = [
  { value: 1, label: 'Microempreendedor' },
  { value: 2, label: 'Agencia de turismo' },
  { value: 0, label: 'Outros' },
]

export const paymentType = [
  { value: 1, isInstallable: false, label: 'Dinheiro' },
  { value: 2, isInstallable: true, label: 'Cartão de crédito' },
  { value: 3, isInstallable: false, label: 'Cartão de débito' },
  { value: 4, isInstallable: true, label: 'Boleto' },
  { value: 5, isInstallable: false, label: 'Transferência' },
]
