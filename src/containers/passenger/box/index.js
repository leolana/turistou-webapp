import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { Card } from 'antd'

import FormSteps from 'components/Step/FormSteps'
import PassengerForm from './PassengerForm'

import PassengerChoice from './form/PassengerChoice'
import PassengerAgreedPayments from './form/PassengerAgreedPayments'
import PassengerPlace from './form/PassengerPlace'

import 'costom.scss'

const pageTitle = 'Novo passageiro'
const formSteps = [
  { title: 'Passageiro', component: PassengerChoice },
  { title: 'Pagamentos combinados', component: PassengerAgreedPayments },
  { title: 'Assento', component: PassengerPlace },
]

class ExcursionPassengers extends Component {
  render() {
    return (
      <div>
        <Helmet title={pageTitle} />

        <Card title={pageTitle}>
          <FormSteps formSteps={formSteps} {...this.props} />
          <br />
          <PassengerForm formSteps={formSteps} {...this.props} />
        </Card>
      </div>
    )
  }
}

export default ExcursionPassengers
