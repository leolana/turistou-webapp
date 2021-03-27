import actions from './actions'

const initialState = {
  isLoading: true,
  isRemovePassengerVisible: false,
  isSwapPassengerVisible: false,
  payload: {
    amountRefunded: 0,
    amountPaid: 0,
    id: null,
    idOfPassengerToBeSwappedWith: null,
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
        isSwapPassengerVisible: false,
      }
    case actions.SET_PAYLOAD:
      return { ...state, payload: action.payload }
    case actions.SET_PASSENGER_TO_REMOVE:
      return { payload: action.payload, isRemovePassengerVisible: true }
    case actions.SET_PASSENGER_TO_SWAP:
      return { payload: action.payload, isSwapPassengerVisible: true }
    case actions.TOGGLE_REMOVE_PASSENGER_VISIBILITY:
      return {
        ...state,
        isRemovePassengerVisible: action.payload,
      }
    case actions.TOGGLE_SWAP_PASSENGER_VISIBILITY:
      return {
        ...state,
        isSwapPassengerVisible: action.payload,
      }

    case actions.SET_PASSENGER_TO_BE_SWAPPED_WITH:
      return { ...state, payload: { ...action.payload, ...state.payload } }
    case actions.CLEAR_PASSENGER_STATUS:
      return {
        isLoading: false,
        isRemovePassengerVisible: false,
        isSwapPassengerVisible: false,
        payload: {
          amountRefunded: 0,
          amountPaid: 0,
          id: null,
          idOfPassengerToBeSwappedWith: null,
        },
      }
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
