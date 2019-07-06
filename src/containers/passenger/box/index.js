import React, { Component } from 'react'
import { Helmet } from 'react-helmet'

import FormSteps from 'components/Step/FormSteps'
import PassengerForm from './PassengerForm'

import PassengerChoice from './form/PassengerChoice'
import PassengerPayment from './form/PassengerPayment'
import PassengerPlace from './form/PassengerPlace'

import 'costom.scss'

const pageTitle = 'Novo passageiro'
const formSteps = [
  { title: 'Passageiro', component: PassengerChoice },
  { title: 'Pagamentos efetuados', component: PassengerPayment },
  { title: 'Assento', component: PassengerPlace },
]

class ExcursionPassengers extends Component {
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
            <PassengerForm formSteps={formSteps} {...this.props} />
          </div>
        </div>
      </div>
    )
  }
}

export default ExcursionPassengers
