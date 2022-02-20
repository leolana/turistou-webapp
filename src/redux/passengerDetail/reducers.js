import actions from './actions'

const initialState = {
  isLoading: true,
  customerName: null,
  ticket: null, // { description ; price }
  payload: {},
}

export default function passengerReducer(state = initialState, { type, payload }) {
  switch (type) {
    case actions.SET_STATE: {
      return { ...state, ...payload }
    }
    case actions.SET_PAYLOAD: {
      return { ...state, payload }
    }
    default:
      return state
  }
}
