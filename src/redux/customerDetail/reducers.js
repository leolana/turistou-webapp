import actions from './actions'

const initialState = {
  isLoading: true,
  payload: {},
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return {
        ...state,
        payload: { ...state.payload, ...action.payload },
      }

    case actions.SAVE_CUSTOMER:
      return {
        ...state,
        isLoading: true,
        payload: action.payload,
      }

    default:
      return state
  }
}