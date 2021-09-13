import actions from './actions'

const initialState = {
  isLoading: true,
  payload: [],
}

export default function passengerReducer(state = initialState, { type, payload }) {
  switch (type) {
    case actions.SET_STATE:
      return { ...state, ...payload }
    default:
      return state
  }
}
