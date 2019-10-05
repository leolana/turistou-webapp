import actions from './actions'

const initialState = {
  isLoading: true,
  error: {},
  payload: {},
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action }
    case actions.SAVE_EXCURSION:
      state.isLoading = true
      // TODO:
      return state

    case actions.SAVE_EXCURSION_FAILURE:
      state.isLoading = false
      // TODO:
      return state

    case actions.SAVE_EXCURSION_SUCCESS:
      state.isLoading = false
      // TODO:
      return state

    default:
      return state
  }
}
