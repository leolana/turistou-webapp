import actions from './actions'

const initialState = {
  isLoading: false,
  error: {},
  payload: {},
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { isLoading: false, payload: { ...state.payload, ...action.payload } }

    case actions.SAVE_EXCURSION:
      return { ...state, isLoading: true, payload: action.payload }

    case actions.GET_EXCURSION_BY_ID:
      return { ...state, isLoading: true, payload: {} }

    default:
      return state
  }
}
