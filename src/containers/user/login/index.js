import React, { Component } from 'react'
import auth from 'services/auth'
import Loader from 'components/LayoutComponents/Loader'

class Login extends Component {
  componentDidMount() {
    return auth.login()
  }

  render() {
    return <Loader />
  }
}

export default Login
