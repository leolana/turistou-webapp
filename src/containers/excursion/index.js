import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

import ExcursionForm from './ExcursionForm'
import ExcursionSteps from './ExcursionSteps'

import './index.scss'

@connect(({ user }) => ({ user }))
class Excursion extends Component {
  constructor() {
    super()
    this.state = { step: 0 }
  }

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
    const { step } = this.state
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
            <ExcursionSteps step={step} {...this.props} />
            <ExcursionForm step={step} {...this.props} />
          </div>
        </div>
      </div>
    )
  }
}

export default Excursion
