import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { Helmet } from 'react-helmet'
import { Card } from 'antd'

import { getExcursionById } from 'redux/excursionDetail/actions'
import FormSteps from 'components/Step/FormSteps'
import PassengerForm from './PassengerForm'

import PassengerChoice from './form/PassengerChoice'
import PassengerAgreedPayments from './form/PassengerAgreedPayments'
import PassengerPlace from './form/PassengerPlace'

import 'costom.scss'

const pageTitle = 'Novo passageiro'
const formSteps = [
  { title: 'Passageiro', component: PassengerChoice, fields: ['customerId', 'ticketPriceId'] },
  {
    title: 'Pagamentos combinados',
    component: PassengerAgreedPayments,
    fields: ['paymentType', 'value', 'installmentQuantity', 'paymentFirstDue'],
  },
  { title: 'Assento', component: PassengerPlace, fields: ['transportId', 'spot', 'stopPointId'] },
]

const ExcursionPassengers = (props) => {
  const dispatch = useDispatch()
  const { excursionId, status } = useParams()

  const passengerStatuses = {
    booked: 'BOOKED',
    waiting: 'WAITING',
  }
  const passengerStatus = passengerStatuses[status]

  useEffect(() => {
    dispatch(getExcursionById(excursionId))
  }, [excursionId, dispatch])

  return (
    <div>
      <Helmet title={pageTitle} />

      <Card title={pageTitle}>
        <FormSteps formSteps={formSteps} {...props} />
        <br />
        <PassengerForm formSteps={formSteps} passengerStatus={passengerStatus} {...props} />
      </Card>
    </div>
  )
}

export default ExcursionPassengers
