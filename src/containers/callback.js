import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import Loader from 'components/LayoutComponents/Loader'
import actions from 'redux/user/actions'

const mapStateToProps = state => ({
  user: state.user,
})

// eslint-disable-next-line import/no-mutable-exports
let Callback = ({ dispatch, user }) => {
  if (user) return <Redirect to="/" />
  dispatch({
    type: actions.HANDLE_AUTHENTICATION_CALLBACK,
  })

  return <Loader />
}
Callback = connect(mapStateToProps)(Callback)

export default Callback
