import moment from 'moment'
import actions from './actions'

const initialState = {
  isLoading: false,
  error: false,
  payload: {},
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { isLoading: false, payload: { ...state.payload, ...action.payload } }

    case actions.CLEAR_STATE:
      return { isLoading: false, payload: {} }

    case actions.GET_EXCURSION_BY_ID:
      return { ...state, isLoading: true, payload: {} }

    case actions.GET_EXCURSION_BY_ID_SUCCESS: {
      const data = {
        ...action.payload,
        departureTime: moment(moment(action.payload.departureDate).format()),
        regressTime: moment(moment(action.payload.regressDate).format()),
      }
      return { ...state, isLoading: false, payload: data }
    }

    case actions.GET_EXCURSION_BY_ID_FAILURE:
      return { ...state, isLoading: false, error: true }

    default:
      return state
  }
}
