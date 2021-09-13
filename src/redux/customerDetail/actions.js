import gql from 'graphql-tag'

import { mutate } from 'core/api/apollo'

const actions = {
  SET_STATE: 'customerDetail/SET_STATE',
  SAVE_CUSTOMER_FAILURE: 'customerDetail/SAVE_CUSTOMER_FAILURE',
  SAVE_CUSTOMER_SUCCESS: 'customerDetail/SAVE_CUSTOMER_SUCCESS',
}

export const setCustomerState = (payload) => ({
  type: actions.SET_STATE,
  payload,
})

export const SAVE_CUSTOMER = gql`
  mutation saveCustomer($input: SaveCustomerInput!) {
    saveCustomer(input: $input) {
      id
    }
  }
`

export const GET_CUSTOMER_BY_ID = gql`
  query Customer($id: String!) {
    customer(id: $id) {
      id
      name
      email
      cpf
      document
      birthDate
      gender
      cellphone
      telephone
      address
      active
    }
  }
`

export const saveCustomer = (form) => {
  form = serializeCustomerDetail(form)
  return mutate({
    mutation: SAVE_CUSTOMER,
    variables: {
      input: form,
    },
  })
}

export const serializeCustomerDetail = (form) => {
  const {
    zipcode,
    addressLine,
    number,
    area,
    complement,
    city,
    state,
    cpf,
    documentNumber,
    ...rest
  } = form

  const payload = {
    ...rest,
    cpf: cpf?.replace(/\D/g, ''),
    documentNumber: documentNumber?.replace(/\D/g, ''),
    address: {
      zipcode: zipcode?.replace(/\D/g, ''),
      addressLine,
      number: number?.toString(),
      area,
      complement,
      city,
      state,
    },
    active: true,
  }

  return payload
}

export default actions
