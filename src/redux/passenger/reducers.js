import actions from './actions'

const initialState = {
  statusId: 1,
  startPay: false,
  fullPay: false,
}

export default function stepReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
