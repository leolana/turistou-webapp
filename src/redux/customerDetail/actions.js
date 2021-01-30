import gql from 'graphql-tag'

import { mutate } from 'core/api/apollo'

const actions = {
  SET_STATE: 'customerDetail/SET_STATE',
  SAVE_CUSTOMER: 'customerDetail/SAVE_CUSTOMER',
  SAVE_CUSTOMER_FAILURE: 'customerDetail/SAVE_CUSTOMER_FAILURE',
  SAVE_CUSTOMER_SUCCESS: 'customerDetail/SAVE_CUSTOMER_SUCCESS',
}

export const saveCustomer = (form) => {
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
    cpf: cpf.replace(/\D/g, ''),
    documentNumber: documentNumber.replace(/\D/g, ''),
    address: {
      zipcode: zipcode.replace(/\D/g, ''),
      addressLine,
      number: number.toString(),
      area,
      complement,
      city,
      state,
    },
    active: true,
    organizationId: '123', // TODO:
  }

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

export const saveCustomerSuccess = (payload) => ({
  payload: { ...payload },
  type: actions.SET_STATE,
  isLoading: false,
})

export const saveCustomerFailure = (payload) => ({
  type: actions.GET_CUSTOMERS_FAILURE,
  payload: { ...payload },
  isLoading: false,
})

export default actions
