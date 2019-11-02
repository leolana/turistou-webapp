import actions from './actions'

const initialState = {
  isLoading: true,
  payload: [],
  filter: { query: '' },
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action }
    case actions.GET_CUSTOMERS_FAILURE:
      return { ...state, ...action }
    default:
      return state
  }
}
