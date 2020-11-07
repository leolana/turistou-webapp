import actions from './actions'

const initialState = {
  isLoading: true,
  payload: [],
}

export default function passengerReducer(state = initialState, { type, payload }) {
  switch (type) {
    case actions.SET_STATE:
      return { ...state, ...payload }
    case actions.GET_PASSENGERS:
      return { ...state, ...payload }
    case actions.GET_PASSENGERS_SUCCESS:
      return { ...state, ...payload }
    default:
      return state
  }
}
