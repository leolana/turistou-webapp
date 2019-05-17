import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Loader from 'components/LayoutComponents/Loader'
import auth from 'services/auth'

class Callback extends Component {
  componentDidMount() {
    auth.handleAuthentication()
    const { history } = this.props
    history.push('/')
  }

  render() {
    return <Loader />
  }
}

export default withRouter(Callback)
