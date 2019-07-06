export const genderOptions = [
  { value: 'FEM', label: 'Feminino' },
  { value: 'MASC', label: 'Masculino' },
  { value: '-', label: 'Outro' },
]
export const typeUserOptions = [
  { value: 'PF', label: 'Pessoa física' },
  { value: 'PJ', label: 'Pessoa jurídica' },
]

export const personType = [
  { value: 1, label: 'Guia de turismo' },
  { value: 2, label: 'Agente de turismo' },
  { value: 0, label: 'Outros' },
]
export const companyType = [
  { value: 1, label: 'Microempreendedor' },
  { value: 2, label: 'Agencia de turismo' },
  { value: 0, label: 'Outros' },
]
export const paymentType = [
  { value: 1, isInstallable: false, label: 'Dinheiro', _value: 'MONEY' },
  { value: 2, isInstallable: true, label: 'Cartão de crédito', _value: 'CREDITCARD' },
  { value: 3, isInstallable: false, label: 'Cartão de débito', _value: 'DEBIT' },
  { value: 4, isInstallable: true, label: 'Boleto', _value: 'PAYMENTBANKSLIP' },
  { value: 5, isInstallable: false, label: 'Transferência', _value: 'BANKTRANSFER' },
]
