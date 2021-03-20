import actions from './actions'

const initialState = {
  isLoading: true,
  isRemovePassengerVisible: false,
  payload: {
    amountRefunded: 0,
    amountPaid: 0,
    id: null,
  },
}

export default function passengerStatusReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATUS:
      return {
        ...state,
        payload: action.payload,
        isLoading: true,
      }
    case actions.SAVE_STATUS_SUCCESS:
      return {
        ...state,
        payload: action.payload,
        isRemovePassengerVisible: false,
      }
    case actions.SET_PAYLOAD:
      return { ...state, payload: action.payload }
    case actions.SET_PASSENGER_TO_CHANGE_STATUS:
      return { payload: action.payload, isRemovePassengerVisible: true }
    case actions.TOGGLE_VISIBILITY:
      return {
        ...state,
        isRemovePassengerVisible: action.payload,
      }
    case actions.CLEAR_PASSENGER_STATUS:
      return {
        isLoading: false,
        isRemovePassengerVisible: false,
        payload: {
          amountRefunded: 0,
          amountPaid: 0,
          id: null,
        },
      }
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
