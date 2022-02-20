const actions = {
  TOGGLE_VISIBILITY: 'paymentStatus/TOGGLE_VISIBILITY',
  TOGGLE_LOADING: 'paymentStatus/TOGGLE_LOADING',
}

export const toggleVisibility = (payload) => ({
  type: actions.TOGGLE_VISIBILITY,
  payload,
})

export const toggleLoading = (payload) => ({
  type: actions.TOGGLE_LOADING,
  payload,
})

export default actions
