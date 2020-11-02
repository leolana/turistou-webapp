import actions from './actions'

const initialState = {
  isLoading: true,
  customerName: null,
  ticket: null, // { description ; price }
  payload: {},
}

export default function passengerReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    case actions.SET_PAYLOAD:
      return { ...state, payload: action.payload }
    case actions.SAVE_PASSENGER:
      return {
        ...state,
        payload: action.payload,
        isLoading: true,
      }
    default:
      return state
  }
}
