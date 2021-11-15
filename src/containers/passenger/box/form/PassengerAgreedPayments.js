import React, { useCallback, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Form, Row, Col, Button } from 'antd'

import AgreedPayment from './AgreedPayment'
import PassengerSummaryHeader from './_passengerResume'

const PassengerAgreedPayments = ({ form }) => {
  const { ticket } = useSelector((state) => state.passengerDetail)

  const [conditionLastId, setConditionLastId] = useState(1)
  const [keys, setKeys] = useState([1])

  const handleAddPayment = useCallback(() => {
    const newId = conditionLastId + 1
    setConditionLastId(newId)
    setKeys((keys) => [...keys, newId]) // eslint-disable-line
  }, [conditionLastId])

  const handleRemovePayment = useCallback(
    (k) => {
      if (keys.length === 1) return

      setKeys((keys) => keys.filter((key) => key !== k)) // eslint-disable-line
    },
    [keys],
  )

  const paymentTotal = useMemo(() => {
    const paymentConditions = form.getFieldValue('paymentConditions')

    if (Array.isArray(paymentConditions))
      return paymentConditions.reduce((total, payment) => {
        return total + (payment?.value || 0)
      }, 0)

    return 0
  }, [form])

  return (
    <>
      <PassengerSummaryHeader />
      {/* TODO: fix warning */}
      {keys.map((k, i) => (
        <Form.Item key={`payment-condition--${k}`}>
          {form.getFieldDecorator(`paymentConditions[${i}]`, {
            initialValue: {},
          })(<AgreedPayment onRemove={() => handleRemovePayment(k)} />)}
        </Form.Item>
      ))}
      Valor total: R$ {paymentTotal ? paymentTotal.toFixed(2) : ''}
      <br />
      Valor em aberto / faltante: R$ {paymentTotal ? (ticket.price - paymentTotal).toFixed(2) : ''}
      <Row type="flex" justify="center">
        <Col xs={16} md={8}>
          <Button block type="dashed" onClick={handleAddPayment}>
            <i className="fa fa-plus mr-3" /> Adicionar pagamento
          </Button>
        </Col>
      </Row>
    </>
  )
}

export default PassengerAgreedPayments
