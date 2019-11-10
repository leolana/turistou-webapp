import actions from './actions'

const initialState = {
  isLoading: true,
  payload: [],
  filter: {
    query: '',
    statusId: 1,
    startPay: false,
    fullPay: false,
  },
}

export default function passengerReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action }
    default:
      return state
  }
}
