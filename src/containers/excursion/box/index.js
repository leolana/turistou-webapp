import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

import FormSteps from 'components/Step/FormSteps'
import ExcursionForm from './ExcursionForm'

import ExcursionDetail from './form/ExcursionDetail'
import ExcursionStopPoint from './form/ExcursionStopPoint'
import ExcursionPricing from './form/ExcursionPricing'
import ExcursionTransport from './form/ExcursionTransport'

import 'costom.scss'
import './index.scss'

const pageTitle = 'Nova excursão'
const formSteps = [
  { component: ExcursionDetail, title: 'Detalhes da viagem' },
  { component: ExcursionStopPoint, title: 'Pontos de parada' },
  { component: ExcursionPricing, title: 'Valores das passagens' },
  { component: ExcursionTransport, title: 'Transportes' },
]

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
        <Helmet title={pageTitle} />
        <div className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>{pageTitle}</strong>
            </div>
          </div>
          <div className="card-header">
            <FormSteps formSteps={formSteps} {...this.props} />
          </div>
          <div className="card-body">
            <ExcursionForm formSteps={formSteps} {...this.props} />
          </div>
        </div>
      </div>
    )
  }
}

export default ExcursionBox
