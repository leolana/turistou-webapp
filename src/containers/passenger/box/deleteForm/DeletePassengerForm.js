import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, InputNumber, Row, Col } from 'antd'

import passengerStatusActions from 'redux/passengerStatus/actions'

const DeletePassengerForm = ({ form, formId, onSubmit }) => {
  const dispatch = useDispatch()
  const { payload: passengerStatus } = useSelector((state) => state.passengerStatus, [dispatch])
  const storagePassengerStatus = useCallback(
    (payload) => dispatch({ type: passengerStatusActions.SET_PAYLOAD, payload }),
    [dispatch],
  )
  const storageRefundedAmount = useCallback(
    (amountRefunded = 0) => {
      storagePassengerStatus({ ...passengerStatus, amountRefunded })
    },
    [passengerStatus, storagePassengerStatus],
  )
  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault()

      form.validateFieldsAndScroll((err, values) => {
        if (!err && typeof onSubmit === 'function') {
          onSubmit(values)
          form.resetFields()
        }
      })
    },
    [form, onSubmit],
  )

  return (
    <Row>
      <Col md={12}>
        <Form id={formId} onSubmit={handleSubmit}>
          {/* <Form.Item label='Motivo da desistência'>
                    <Input size='default' maxLength={150} />
                </Form.Item> */}
          <Form.Item label="Valor devolvido">
            {form.getFieldDecorator('amountRefunded', {
              rules: [{ required: true, message: 'Campo requirido.' }],
            })(
              <InputNumber
                onChange={storageRefundedAmount}
                size="default"
                min={0}
                max={passengerStatus.amountPaid}
              />,
            )}
          </Form.Item>
          {}
        </Form>
      </Col>
      <Col md={12} className="pt-3 pl-5">
        <div>
          Valor pago:{' '}
          <span className="float-right font-weight-bold">{passengerStatus.amountPaid}</span>
        </div>
        <div>
          Valor devolvido:
          <span className="float-right font-weight-bold text-danger">
            {passengerStatus.amountRefunded}
          </span>
        </div>
        <div>
          Valor em caixa:{' '}
          <span className="float-right font-weight-bold">
            {passengerStatus.amountPaid - passengerStatus.amountRefunded || 0}
          </span>
        </div>
      </Col>
    </Row>
  )
}

export default Form.create()(DeletePassengerForm)
