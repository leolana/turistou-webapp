import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { Form, Row, Col, Button } from 'antd'

import AgreedPayment from './AgreedPayment'

const PassengerAgreedPayments = ({ form }) => {
  const { customerName, ticket } = useSelector(state => state.passengerDetail)

  const [conditionLastId, setConditionLastId] = useState(1)

  const handleAddPayment = useCallback(() => {
    setConditionLastId(conditionLastId + 1)

    const keys = form.getFieldValue('keys')
    const nextKeys = keys.concat(conditionLastId)
    form.setFieldsValue({
      keys: nextKeys,
    })
  }, [conditionLastId, setConditionLastId, form])

  const handleRemovePayment = useCallback((k) => {
    const keys = form.getFieldValue('keys')
    if (keys.length === 1) return

    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    })
  }, [form])

  form.getFieldDecorator('keys', { initialValue: [conditionLastId] })
  const keys = form.getFieldValue('keys')

  return (
    <>
      <Row className="mb-5">
        <Col xs={24} md={12}>
          <b>Passageiro: </b>
          <span>{customerName}</span>
        </Col>
        <Col xs={24} md={12}>
          <b>Tipo de passagem: </b>
          {ticket && `${ticket.description}(R$ ${ticket.price})`}
        </Col>
      </Row>

      {keys.map((k, i) => (
        <Form.Item key={`payment-condition--${k}`}>
          {form.getFieldDecorator(`paymentConditions[${i}]`, {
            initialValue: {},
          })(<AgreedPayment onRemove={() => handleRemovePayment(k)} />)}
        </Form.Item>
      ))}

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
