import actions from './actions'

const initialState = {
  current: 0,
}

export default function stepReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
