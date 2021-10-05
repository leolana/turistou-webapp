import gql from 'graphql-tag'

const actions = {
  SET_STATE: 'customerList/SET_STATE',
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
      number
      dispatcher
      dispatcherState
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

export default actions
