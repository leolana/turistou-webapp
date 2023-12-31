import React, { Component } from 'react'
import * as auth from 'core/auth'
import Loader from 'components/LayoutComponents/Loader'

class Login extends Component {
  async componentDidMount() {
    await auth.login()
  }

  render() {
    return <Loader />
  }
}

export default Login
