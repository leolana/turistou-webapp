import React, { useEffect } from 'react'
import { useQuery } from 'react-apollo'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Helmet } from 'react-helmet'
import { Card } from 'antd'

import { GET_EXCURSION_BY_ID, setExcursionState } from 'redux/excursionDetail/actions'

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

const ExcursionPassengers = (props) => {
  const dispatch = useDispatch()
  const { excursionId, status } = useParams()

  const passengerStatuses = {
    booked: 'BOOKED',
    waiting: 'WAITING',
  }
  const passengerStatus = passengerStatuses[status]

  const { data: { excursion = {} } = {}, refetch: getExcursionById } = useQuery(
    GET_EXCURSION_BY_ID,
    { variables: { id: excursionId } },
  )

  useEffect(() => {
    getExcursionById(excursionId)
  }, [getExcursionById, excursionId])

  useEffect(() => {
    dispatch(setExcursionState(excursion))
  }, [dispatch, excursion])

  return (
    <div>
      <Helmet title={pageTitle} />

      <Card title={pageTitle}>
        <FormSteps formSteps={formSteps} {...props} />
        <br />
        <PassengerForm
          formSteps={formSteps}
          passengerStatus={passengerStatus}
          getExcursionById={getExcursionById}
          excursion={excursion}
          {...props}
        />
      </Card>
    </div>
  )
}

export default ExcursionPassengers
