import { Modal, Table } from 'antd'
import React, { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import paymentsActions from 'redux/payments/actions'
import paymentMethods from 'constants/paymentMethods'
import PaymentSelect from 'components/PaymentSelect/PaymentSelect'

import style from './style.module.scss'

function HistoryPayment({ afterClose }) {
  const dispatch = useDispatch()

  const {
    payload: payments = [],
    isVisible: isPaymentListVisible = false,
    isLoading: isPaymentsLoading,
  } = useSelector((state) => state.payments)

  const closePaymentsListModal = useCallback(
    () => dispatch({ type: paymentsActions.TOGGLE_VISIBILITY, payload: false }),
    [dispatch],
  )

  const setToPaid = useCallback(
    ({ passengerId, paymentId }) =>
      dispatch({ type: paymentsActions.SET_TO_PAID, payload: { passengerId, paymentId } }),
    [dispatch],
  )
  const setToPending = useCallback(
    ({ passengerId, paymentId }) =>
      dispatch({ type: paymentsActions.SET_TO_UNPAID, payload: { passengerId, paymentId } }),
    [dispatch],
  )
  const setPaymentStatusToCanceled = useCallback(
    ({ passengerId, paymentId }) =>
      dispatch({ type: paymentsActions.SET_TO_CANCELED, payload: { passengerId, paymentId } }),
    [dispatch],
  )

  const columnsForPayments = () => {
    const columns = [
      {
        title: 'Data',
        dataIndex: 'payDate',
        key: 'payDate',
        width: '30%',
        render: (x) => x && new Date(x).toLocaleDateString(),
      },
      {
        title: 'Valor',
        dataIndex: 'value',
        key: 'value',
        width: '20%',
        className: 'text-left',
        render: (x) => `R$ ${x}`,
      },
      {
        title: 'Forma de pagamento',
        dataIndex: 'method',
        key: 'method',
        width: '20%',
        render: (x, row) => {
          let text
          if (row.operation === 'CHARGE_BACK') {
            text = 'Devolução'
          } else {
            text = paymentMethods[x] || 'Não especificado'
          }

          return text
        },
      },
      {
        title: 'Situação',
        dataIndex: 'status',
        key: 'status',
        className: 'text-center',
        render: (_, row) => {
          const { id, passengerId, status, method } = row

          const payload = {
            passengerId,
            paymentId: id,
          }

          return method === 'PAYMENT_BANK_SLIP' ? (
            <PaymentSelect
              status={status}
              onChange={(statusModified) => {
                if (statusModified === 'paid') {
                  return setToPaid(payload)
                }

                if (statusModified === 'pending') {
                  return setToPending(payload)
                }

                if (statusModified === 'canceled') {
                  return Modal.confirm({
                    okCancel: true,
                    cancelText: 'Não',
                    okText: 'Sim',
                    title: 'Cancelar pagamento?',
                    content: 'Deseja cancelar esse pagamento? Você não poderá reverter essa ação.',
                    onOk: () => {
                      setPaymentStatusToCanceled(payload)
                    },
                  })
                }

                throw Error(`ERROR: status payment not found: ${statusModified}`)
              }}
            />
          ) : (
            <span className={style.paid}>Pago</span>
          )
        },
      },
    ]

    return columns
  }

  const filteredPayments = useMemo(
    () => payments.filter((payment) => payment.status !== 'CANCELED'),
    [payments],
  )

  return (
    <Modal
      title="Datas de pagamento"
      width={700}
      visible={isPaymentListVisible}
      onCancel={closePaymentsListModal}
      onOk={closePaymentsListModal}
      afterClose={afterClose}
    >
      <Table
        rowKey={(record) => `${record.id}${record.payDate}${record.operation}`}
        className="utils__scrollTable"
        scroll={{ x: '100%' }}
        columns={columnsForPayments()}
        dataSource={filteredPayments}
        pagination={false}
        loading={isPaymentsLoading}
      />
    </Modal>
  )
}

export default HistoryPayment
