import actions from './actions'

const initialState = {
  isLoading: true,
  payload: [],
  isVisible: false,
}

export default function paymentsReducer(state = initialState, action) {
  switch (action.type) {
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
      return { ...state, isLoading: false, payload: action.payload }
    default:
      return state
  }
}