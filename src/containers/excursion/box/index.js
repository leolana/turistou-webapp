import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

import FormSteps from '@components/Step/FormSteps'
import ExcursionForm from './ExcursionForm'

import ExcursionDetail, { formFields as excursionDetailFormFields } from './form/ExcursionDetail'
import ExcursionStopPoint from './form/ExcursionStopPoint'
import ExcursionPricing, { formFields as excursionPricingFormFields } from './form/ExcursionPricing'
import ExcursionTransport from './form/ExcursionTransport'

import '@costom.scss'

const pageTitle = 'Nova excursão'
const formSteps = [
  {
    component: ExcursionDetail,
    title: 'Detalhes da viagem',
    fields: excursionDetailFormFields,
  },
  { component: ExcursionStopPoint, title: 'Pontos de parada', fields: [] },
  {
    component: ExcursionPricing,
    title: 'Valores das passagens',
    fields: excursionPricingFormFields,
  },
  { component: ExcursionTransport, title: 'Transportes', fields: [] },
]

@connect(({ user }) => ({ user }))
class ExcursionBox extends Component {
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
