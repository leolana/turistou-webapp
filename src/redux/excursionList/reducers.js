import { notification } from 'antd'
import actions from './actions'

const initialState = {
  statusId: 0,
  query: '',
  isLoading: true,
  payload: [],
  filter: {},
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case actions.SET_STATE:
      return { ...state, ...payload }

    case actions.GET_EXCURSIONS_FAILURE:
      notification.error({
        message: 'Falha',
        description: 'Não foi possível trazer os dados das excursões',
      })
      return { ...state, ...payload }

    case actions.DELETE_EXCURSION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        payload: state.payload.filter((x) => x.id !== payload.id),
      }

    default:
      return state
  }
}
