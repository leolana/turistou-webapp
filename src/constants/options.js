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
  { value: 'MONEY', isInstallable: false, label: 'Dinheiro' },
  { value: 'CREDIT_CARD', isInstallable: true, label: 'Cartão de crédito' },
  { value: 'DEBIT', isInstallable: false, label: 'Cartão de débito' },
  { value: 'PAYMENT_BANK_SLIP', isInstallable: true, label: 'Boleto' },
  { value: 'BANK_TRANSFER', isInstallable: false, label: 'Transferência' },
]
