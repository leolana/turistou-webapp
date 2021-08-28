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

    default:
      return state
  }
}
