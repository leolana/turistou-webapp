import actions from './actions'

const initialState = {
  isLoading: true,
  payload: {},
}

export default function passengerReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action }
    case actions.SAVE_PASSENGER:
      return { ...state, payload: action.payload }
    default:
      return state
  }
}
