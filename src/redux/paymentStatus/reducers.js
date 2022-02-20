import actions from './actions'

const initialState = {
  isLoading: true,
  payload: {},
  isVisible: false,
  passengerId: null,
}

export default function paymentStatusReducer(state = initialState, action) {
  switch (action.type) {
    case actions.CLEAR_PAYMENT_STATUS:
      return {
        isVisible: false,
        isLoading: false,
        passengerId: null,
        payload: {},
      }

    case actions.TOGGLE_VISIBILITY:
      return {
        ...state,
        isVisible: action.payload,
      }

    case actions.TOGGLE_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      }

    case actions.SET_STATE:
      return {
        ...state,
        isLoading: false,
        ...action.payload,
      }

    default:
      return state
  }
}
