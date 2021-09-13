import React, { useMemo } from 'react'
import { useParams } from 'react-router'
import { Helmet } from 'react-helmet'

import FormSteps from 'components/Step/FormSteps'
import ExcursionForm from './ExcursionForm'

import ExcursionDetail, { formFields as excursionDetailFormFields } from './form/ExcursionDetail'
import ExcursionStopPoint from './form/ExcursionStopPoint'
import ExcursionPricing, { formFields as excursionPricingFormFields } from './form/ExcursionPricing'
import ExcursionTransport from './form/ExcursionTransport'

import 'costom.scss'

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

const ExcursionBox = (props) => {
  const { excursionId } = useParams()

  const pageTitle = useMemo(() => (excursionId ? 'Editar excursão' : 'Nova excursão'), [
    excursionId,
  ])

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
          <FormSteps formSteps={formSteps} {...props} />
        </div>
        <div className="card-body">
          <ExcursionForm formSteps={formSteps} {...props} />
        </div>
      </div>
    </div>
  )
}

export default ExcursionBox
