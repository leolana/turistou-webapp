import actions from './actions'

const initialState = {
  isLoading: true,
  error: {},
  payload: {},
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { isLoading: false, payload: { ...state.payload, ...action.payload } }
    case actions.SAVE_EXCURSION:
      return { ...state, isLoading: true, payload: action.payload }

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
