import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import CustomerForm from './CustomerForm'
import './index.scss'

@connect(({ user }) => ({ user }))
class Customers extends Component {
  onSubmit = event => {
    event.preventDefault()
    const { form, dispatch } = this.props
    form.validateFields((error, values) => {
      if (!error) {
        dispatch({
          type: 'customer/SAVE',
          payload: values,
        })
      }
    })
  }

  render() {
    return (
      <div>
        <Helmet title="Login" />
        <div className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Novo cliente</strong>
            </div>
            <div className="utils__titleDescription">
              {/* Block with important Recently Referrals information */}
            </div>
          </div>
          <div className="card-body">
            <CustomerForm {...this.props} />
          </div>
        </div>
      </div>
    )
  }
}

export default Customers
