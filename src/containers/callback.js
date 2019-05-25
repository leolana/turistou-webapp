import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Loader from 'components/LayoutComponents/Loader'

@connect(({ user }) => ({ user }))
class Callback extends Component {
  async componentDidMount() {
    console.log('------------ callback ------------')
    const { dispatch } = this.props
    dispatch({
      type: 'user/LOGIN',
    })
    const { history } = this.props
    history.push('/')
  }

  render() {
    return <Loader />
  }
}

export default withRouter(Callback)
