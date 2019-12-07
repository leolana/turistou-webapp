import gql from 'graphql-tag'

import { mutate } from 'core/api/apollo'

const actions = {
  SET_STATE: 'customerDetail/SET_STATE',
  SAVE_CUSTOMER: 'customerDetail/SAVE_CUSTOMER',
  SAVE_CUSTOMER_FAILURE: 'customerDetail/SAVE_CUSTOMER_FAILURE',
  SAVE_CUSTOMER_SUCCESS: 'customerDetail/SAVE_CUSTOMER_SUCCESS',
}

export const saveCustomer = form => {
  const {
    name,
    email,
    cpf,
    documentState,
    document,
    birthDate,
    gender,
    zipcode,
    addressLine,
    number,
    area,
    complement,
    city,
    state,
    cellphone,
    telephone,
    healthPlan,
    allergy,
    contactName,
    contactPhone,
    foodRestriction,
    howHearAbout,
    notes,
  } = form

  const payload = {
    name,
    email,
    gender,
    cpf,
    document,
    documentState,
    birthDate,
    cellphone,
    telephone,
    healthPlan,
    allergy,
    contactName,
    contactPhone,
    foodRestriction,
    howHearAbout,
    notes,
    address: {
      zipcode,
      addressLine,
      number,
      area,
      complement,
      city,
      state,
    },
    active: true,
    organizationId: '123',
  }

  console.log('mutate')
  return mutate({
    mutation: gql`
      mutation saveCustomer($input: SaveCustomerInput!) {
        saveCustomer(input: $input) {
          id
        }
      }
    `,
    variables: {
      input: payload,
    },
  })
}

export const saveCustomerSuccess = payload => ({
  payload: { ...payload },
  type: actions.SET_STATE,
  isLoading: false,
})

export const saveCustomerFailure = payload => ({
  type: actions.GET_CUSTOMERS_FAILURE,
  payload: { ...payload },
  isLoading: false,
})

export default actions
