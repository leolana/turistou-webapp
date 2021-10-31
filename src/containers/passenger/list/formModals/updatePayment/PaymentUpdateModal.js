import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Modal, Row } from 'antd'

import paymentStatusActions from 'redux/paymentStatus/actions'

import PaymentUpdateForm from './PaymentUpdateForm'

function AddPayment({ afterClose }) {
  const dispatch = useDispatch()

  const { isVisible } = useSelector((state) => state.paymentStatus)

  const {
    payload: paymentStatus = {
      amountPaid: 0,
      remaining: 0,
      previousPaid: 0,
    },
  } = useSelector((state) => state.paymentStatus)

  const addPayment = useCallback(
    (values) => dispatch({ type: paymentStatusActions.PAYMENT_INSERT, payload: { values } }),
    [dispatch],
  )

  return (
    <Modal
      title="Atualizar pagamento"
      width={700}
      visible={isVisible}
      onCancel={afterClose}
      footer={[
        <Button onClick={afterClose} type="default" key="cancel" htmlType="button">
          Cancelar
        </Button>,
        <Button type="primary" form="paymentUpdateForm" key="submit" htmlType="submit">
          Atualizar
        </Button>,
      ]}
    >
      <Row>
        <Col sm={8}>
          <div>
            Valor pago anteriormente: <span>{paymentStatus.previousPaid}</span>
          </div>
        </Col>
        <Col sm={8}>
          <div>
            Total pago: <span>{paymentStatus.amountPaid}</span>
          </div>
        </Col>
        <Col sm={8}>
          <div>
            Valor faltante: <span>{paymentStatus.remaining}</span>
          </div>
        </Col>
        <Col sm={24}>
          <PaymentUpdateForm
            formId="paymentUpdateForm"
            onSubmit={addPayment}
            remaining={paymentStatus.remaining}
          />
        </Col>
      </Row>
    </Modal>
  )
}

export default AddPayment
