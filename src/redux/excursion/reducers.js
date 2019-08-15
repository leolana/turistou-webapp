import actions from './actions'

const initialState = {
  statusId: 0,
  query: '',
  loading: false,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    case actions.GET_EXCURSIONS_FAILURE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
