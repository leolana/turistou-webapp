import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from 'react-apollo'
import { Button, Col, Modal, notification, Row } from 'antd'

import { clearPaymentStatus, PAYMENT_INSERT } from 'redux/paymentStatus/actions'

import PaymentUpdateForm from './PaymentUpdateForm'

function AddPayment({ afterClose, getPassengers }) {
  const dispatch = useDispatch()
  const [insertPayment, { loading, error, called }] = useMutation(PAYMENT_INSERT)

  const {
    isVisible,
    payload: paymentStatus = {
      amountPaid: 0,
      remaining: 0,
      previousPaid: 0,
    },
  } = useSelector((state) => state.paymentStatus)

  useEffect(() => {
    if (error) {
      notification.error({
        title: 'Falha',
        message: 'Houve uma falha ao adicionar pagamento do passageiro',
      })
    }
    if (called && !loading) {
      dispatch(clearPaymentStatus())
      getPassengers()
    }
  }, [error, loading, called, getPassengers, dispatch])

  const addPayment = useCallback(
    (values) => {
      const input = { passengerId: paymentStatus.passengerId, payment: values }
      insertPayment({ variables: { input } })
    },
    [paymentStatus.passengerId, insertPayment],
  )

  return (
    <Modal
      title="Atualizar pagamento"
      width={700}
      visible={isVisible}
      onCancel={afterClose}
      footer={[
        <Button onClick={afterClose} key="cancel">
          Cancelar
        </Button>,
        <Button type="primary" form="paymentUpdateForm" key="submit" htmlType="submit">
          Atualizar
        </Button>,
      ]}
    >
      <Row>
        <Col sm={8}>
          Valor pago anteriormente: <span>{paymentStatus.previousPaid}</span>
        </Col>
        <Col sm={8}>
          Total pago: <span>{paymentStatus.amountPaid}</span>
        </Col>
        <Col sm={8}>
          Valor faltante: <span>{paymentStatus.remaining}</span>
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
