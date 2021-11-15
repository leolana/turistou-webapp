import gql from 'graphql-tag'

import { mutate } from 'core/api/apollo'

const actions = {
  SET_STATE: 'customerDetail/SET_STATE',
  CLEAR_STATE: 'customerDetail/CLEAR_STATE',
  SAVE_CUSTOMER_FAILURE: 'customerDetail/SAVE_CUSTOMER_FAILURE',
  SAVE_CUSTOMER_SUCCESS: 'customerDetail/SAVE_CUSTOMER_SUCCESS',
}

export const setCustomerState = (payload) => ({
  type: actions.SET_STATE,
  payload,
})

export const clearCustomerState = (payload) => ({
  type: actions.CLEAR_STATE,
  payload,
})

const customerFragment = gql`
  fragment CustomerFragment on Customer {
    id
    name
    email
    cpf
    document {
      number
      dispatcher
      dispatcherState
    }
    birthDate
    gender
    address {
      addressLine
      zipcode
      area
      number
      complement
      state
      city
    }
    cellphone
    telephone
    occupation
    healthPlan
    allergy
    contactName
    contactPhone
    foodRestriction
    howHearAbout
    notes
    active
  }
`

export const SAVE_CUSTOMER = gql`
  mutation saveCustomer($input: SaveCustomerInput!) {
    saveCustomer(input: $input) {
      ...CustomerFragment
    }
  }
  ${customerFragment}
`

export const GET_CUSTOMER_BY_ID = gql`
  query Customer($id: String!) {
    customer(id: $id) {
      ...CustomerFragment
    }
  }
  ${customerFragment}
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
    documentDispatcher,
    documentDispatcherState,
    ...rest
  } = form

  const payload = {
    ...rest,
    cpf: cpf?.replace(/\D/g, ''),
    document: {
      number: documentNumber?.replace(/\D/g, ''),
      dispatcher: documentDispatcher,
      dispatcherState: documentDispatcherState,
    },
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

export const parseCustomerDetail = (data) => {
  const { address, document, ...rest } = data

  const customer = {
    ...rest,
    ...address,
    documentNumber: document?.number,
    documentDispatcher: document?.dispatcher,
    documentDispatcherState: document?.dispatcherState,
  }

  return customer
}

export default actions
