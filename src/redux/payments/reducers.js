import actions from './actions'

const initialState = {
  isLoading: true,
  payload: [],
  isPaymentListVisible: false,
  isPaymentUpdateVisible: false,
}

export default function paymentsReducer(state = initialState, action) {
  switch (action.type) {
    case actions.TOGGLE_PAYMENTS_LIST_VISIBILITY:
      return {
        ...state,
        isPaymentListVisible: action.payload,
      }

    case actions.TOGGLE_PAYMENTS_UPDATE_VISIBILITY:
      return {
        ...state,
        isPaymentUpdateVisible: action.payload,
      }

    case actions.TOGGLE_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      }

    case actions.SET_STATE:
      return { ...state, isLoading: false, payload: action.payload }
    default:
      return state
  }
}
