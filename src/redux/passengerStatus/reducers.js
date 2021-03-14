import actions from './actions'

const initialState = {
  isLoading: true,
  payload: {},
}

export default function passengerStatusReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATUS:
      debugger
      return {
        ...state,
        payload: action.payload,
        isLoading: true,
      }
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
