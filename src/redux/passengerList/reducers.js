import actions from './actions'

const initialState = {
  isLoading: true,
  payload: [],
  filter: {
    excursionId: null,
    query: '',
    status: 'BOOKED',
    startPay: false,
    fullPay: false,
  },
}

export default function passengerReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action }
    case actions.GET_PASSENGERS:
      return { ...state, ...action }
    case actions.GET_PASSENGERS_SUCCESS:
      return { ...state, ...action }
    default:
      return state
  }
}
