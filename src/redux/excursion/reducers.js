import actions from './actions'

const initialState = {
  statusId: 0,
  query: '',
  loading: false,
  payload: [],
}

export default function reducer(state = initialState, action) {
  console.log('----------- payload ----------')
  console.log(action)
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action }
    case actions.GET_EXCURSIONS_FAILURE:
      return { ...state, ...action }
    default:
      return state
  }
}
