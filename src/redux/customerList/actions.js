import gql from 'graphql-tag'

import { query } from 'core/api/apollo'

const actions = {
  SET_STATE: 'customerList/SET_STATE',
  GET_CUSTOMERS: 'customerList/GET_DATA',
  GET_CUSTOMERS_FAILURE: 'customerList/GET_CUSTOMERS_FAILURE',
}

export const setCustomerListState = (payload) => ({
  type: actions.SET_STATE,
  payload,
})

const customerFragment = gql`
  fragment CustomerFragment on Customer {
    id
    name
    cellphone
    document {
      documentNumber
      documentDispatcher
      documentDispatcherState
    }
    address {
      city
    }
  }
`

export const FETCH_CUSTOMERS = gql`
  {
    customers {
      ...CustomerFragment
    }
  }
  ${customerFragment}
`

export const fetchCustomers = () => ({
  type: actions.GET_CUSTOMERS,
  payload: { loading: true },
  request: () =>
    query({
      query: FETCH_CUSTOMERS,
    }),
})

export const fetchCustomersSuccess = (payload) => {
  return {
    type: actions.SET_STATE,
    payload: payload.customers,
    isLoading: false,
  }
}

export const fetchCustomersFailure = (payload) => ({
  type: actions.GET_CUSTOMERS_FAILURE,
  payload: { ...payload },
  isLoading: false,
})

export default actions
