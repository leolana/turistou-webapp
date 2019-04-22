import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

import ExcursionForm from './ExcursionForm'
import ExcursionSteps from './ExcursionSteps'

import 'costom.scss'
import './index.scss'

@connect(({ user }) => ({ user }))
class ExcursionBox extends Component {
  onSubmit = event => {
    event.preventDefault()
    const { form, dispatch } = this.props
    form.validateFields((error, values) => {
      if (!error) {
        dispatch({
          type: 'excursion/SAVE',
          payload: values,
        })
      }
    })
  }

  render() {
    return (
      <div>
        <Helmet title="Excursão" />
        <div className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Nova excursão</strong>
            </div>
            <div className="utils__titleDescription">
              {/* Block with important Recently Referrals information */}
            </div>
          </div>
          <div className="card-body">
            <ExcursionSteps className="mb-5" {...this.props} />
            <ExcursionForm {...this.props} />
          </div>
        </div>
      </div>
    )
  }
}

export default ExcursionBox
