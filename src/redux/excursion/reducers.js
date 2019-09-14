import actions from './actions'

const initialState = {
  isLoading: true,
  payloadList: [],
  payloadEdit: {},
  filter: {},
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      state.filter = action.payload
      // TODO:
      return state

    case actions.GET_DATA:
      state.isLoading = true
      // TODO:
      return state

    case actions.GET_DATA_SUCCESS:
      state.isLoading = false
      // TODO:
      return state

    case actions.DELETE_DATA:
      state.isLoading = true
      // TODO:
      return state

    case actions.DELETE_DATA_SUCCESS:
      state.isLoading = false
      // TODO:
      return state

    default:
      return state
  }
}
