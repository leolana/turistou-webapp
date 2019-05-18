import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { notification } from 'antd'

import Loader from 'components/LayoutComponents/Loader'
import auth from 'services/auth'

class Callback extends Component {
  async componentDidMount() {
    await auth.handleAuthentication()
    const { history } = this.props
    history.push('/')
  }

  componentWillUnmount() {
    notification.success({
      message: 'Logged In',
      description: 'You have successfully logged in to Clean UI React Admin Template!',
    })
  }

  render() {
    return <Loader />
  }
}

export default withRouter(Callback)
