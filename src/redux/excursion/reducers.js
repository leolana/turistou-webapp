import actions from './actions'

const initialState = {
  statusId: 0,
  query: '',
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
