import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import ExcursionForm from './ExcursionForm'
// import './index.scss'

@connect(({ user }) => ({ user }))
class Excursion extends Component {
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
            <ExcursionForm {...this.props} />
          </div>
        </div>
      </div>
    )
  }
}

export default Excursion
