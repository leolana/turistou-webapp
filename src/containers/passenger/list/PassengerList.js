import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Tag, Modal, Row, Col, Table } from 'antd'
import paymentMethods from 'constants/paymentMethods'

import passengerStatusActions from 'redux/passengerStatus/actions'
import paymentsActions from 'redux/payments/actions'
import paymentStatusActions from 'redux/paymentStatus/actions'
import SkeletonTable from 'components/SkeletonTable/SkeletonTable'

import PaymentSelect from 'components/PaymentSelect/PaymentSelect'
import SwapPassengerForm from 'containers/passenger/box/swapForm/SwapPassengerForm'
import PaymentUpdateForm from 'components/PaymentUpdateForm/PaymentUpdateForm'
import DeletePassengerForm from 'containers/passenger/box/deleteForm/DeletePassengerForm'

const statusesEnum = {
  booked: 'BOOKED',
  waiting: 'WAITING',
  canceled: 'CANCELED',
}

const statuses = [
  {
    id: 1,
    value: 'BOOKED',
    description: 'Reservado',
    type: 'success',
  },
  {
    id: 2,
    value: 'WAITING',
    description: 'Em espera',
    type: 'warning',
  },
  {
    id: 3,
    value: 'CANCELED',
    description: 'Desistência',
    type: 'danger',
  },
]

const PassengerList = (props) => {
  const dispatch = useDispatch()
  const setPassengerToRemove = useCallback(
    (id, amountPaid) =>
      dispatch({
        type: passengerStatusActions.SET_PASSENGER_TO_REMOVE,
        payload: { id, amountPaid, amountRefunded: 0 },
      }),
    [dispatch],
  )

  const setPassengerToSwap = useCallback(
    (id) =>
      dispatch({
        type: passengerStatusActions.SET_PASSENGER_TO_SWAP,
        payload: { id },
      }),
    [dispatch],
  )

  const swapPassengers = useCallback(
    (id, idOfCustomerToBeSwappedWith) =>
      dispatch({
        type: passengerStatusActions.SWAP_PASSENGERS,
        payload: { id, idOfCustomerToBeSwappedWith },
      }),
    [dispatch],
  )

  const setStatusToBooked = useCallback(
    (passengerId) =>
      dispatch({ type: passengerStatusActions.SET_TO_BOOKED, payload: { passengerId } }),
    [dispatch],
  )
  const setStatusToCanceled = useCallback(
    (passengerId, amountRefunded) =>
      dispatch({
        type: passengerStatusActions.SET_TO_CANCELED,
        payload: { passengerId, amountRefunded },
      }),
    [dispatch],
  )
  const closeDeletePassengerModal = useCallback(
    () =>
      dispatch({ type: passengerStatusActions.TOGGLE_REMOVE_PASSENGER_VISIBILITY, payload: false }),
    [dispatch],
  )
  const closeSwapPassengerModal = useCallback(
    () =>
      dispatch({ type: passengerStatusActions.TOGGLE_SWAP_PASSENGER_VISIBILITY, payload: false }),
    [dispatch],
  )
  const clearPassengerStatus = useCallback(
    () => dispatch({ type: passengerStatusActions.CLEAR_PASSENGER_STATUS }),
    [dispatch],
  )
  const getPayments = useCallback(
    (passengerId) => dispatch({ type: paymentsActions.GET_PAYMENTS, payload: { passengerId } }),
    [dispatch],
  )
  const getPaymentStatus = useCallback(
    (passengerId) =>
      dispatch({ type: paymentStatusActions.GET_PAYMENT_STATUS, payload: { passengerId } }),
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
  const closePaymentsListModal = useCallback(
    () => dispatch({ type: paymentsActions.TOGGLE_VISIBILITY, payload: false }),
    [dispatch],
  )
  const clearPayments = useCallback(
    () => dispatch({ type: paymentsActions.SET_STATE, payload: [] }),
    [dispatch],
  )
  const addPayment = useCallback(
    (values) => dispatch({ type: paymentStatusActions.PAYMENT_INSERT, payload: { values } }),
    [dispatch],
  )
  const clearPaymentStatus = useCallback(
    () => dispatch({ type: paymentStatusActions.CLEAR_PAYMENT_STATUS }),
    [dispatch],
  )

  const { isLoading: isPassengerLoading, payload: passengers } = useSelector(
    (state) => state.passengerList,
  )
  const {
    payload: payments = [],
    isVisible: isPaymentListVisible = false,
    isLoading: isPaymentsLoading,
  } = useSelector((state) => state.payments)
  const {
    isVisible: isPaymentFormVisible,
    payload: paymentStatus = {
      amountPaid: 0,
      remaining: 0,
      previousPaid: 0,
    },
  } = useSelector((state) => state.paymentStatus)
  const {
    isRemovePassengerVisible,
    isSwapPassengerVisible,
    payload: passengerStatus,
  } = useSelector((state) => state.passengerStatus)

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
            'Pago'
          )
        },
      },
    ]

    return columns
  }

  const swap = ({ customerId }) => {
    swapPassengers(passengerStatus.id, customerId)
  }

  const book = (id) => {
    setStatusToBooked(id)
  }

  const remove = ({ amountRefunded }) => {
    setStatusToCanceled(passengerStatus.id, amountRefunded)
  }

  /* CHECK IF THIS IS A TO DO
  const update = (id) => {
    console.log('update: ', id, paymentValue)
  } */

  const contentForPaymentsUpdate = () => {
    const content = (
      <Row>
        <Col sm={12}>
          <PaymentUpdateForm
            formId="paymentUpdateForm"
            onSubmit={addPayment}
            remaining={paymentStatus.remaining}
          />
        </Col>
        <Col sm={12} className="pl-4">
          <div>
            Valor pago anteriormente: <span>{paymentStatus.previousPaid}</span>
          </div>
          <div>
            Total pago: <span>{paymentStatus.amountPaid}</span>
          </div>
          <div>
            Valor faltante: <span>{paymentStatus.remaining}</span>
          </div>
        </Col>
      </Row>
    )

    return content
  }

  const handleRemove = ({ id, amountPaid }) => {
    setPassengerToRemove(id, amountPaid)
  }

  const handleHistory = (id) => {
    getPayments(id)
  }

  const handleUpdate = (id) => {
    getPaymentStatus(id)
  }

  const handleBook = (id) => {
    Modal.confirm({
      okCancel: true,
      cancelText: 'Não',
      okText: 'Sim',
      title: 'Confirmar reserva',
      content: 'Deseja confirmar o passageiro à excursão?',
      onOk: () => book(id),
    })
  }

  const handleSwapPassenger = (id) => {
    setPassengerToSwap(id)
  }

  const renderActionsButtons = (passenger) => {
    const bookedActions = (
      <div className="table-action-buttons">
        <Button
          ghost
          size="small"
          type="primary"
          title="Atualizar pagamento"
          onClick={() => {
            handleUpdate(passenger.id)
          }}
        >
          <i className="fa fa-dollar" />
        </Button>
        <Button
          ghost
          size="small"
          type="primary"
          title="Histórico de pagamento"
          onClick={() => {
            handleHistory(passenger.id)
          }}
        >
          <i className="fa fa-calendar" />
        </Button>
        <Button
          ghost
          size="small"
          type="primary"
          title="Trocar passageiro"
          onClick={() => {
            handleSwapPassenger(passenger.id)
          }}
        >
          <i className="fa fa-exchange" />
        </Button>
        <Button
          ghost
          size="small"
          type="danger"
          title="Passageiro desistiu"
          onClick={() => handleRemove(passenger)}
        >
          <i className="fa fa-times" />
        </Button>
      </div>
    )

    const waitingActions = (
      <div className="table-action-buttons">
        <Button
          ghost
          size="small"
          type="primary"
          title="Reservar passageiro"
          onClick={() => {
            handleBook(passenger.id)
          }}
        >
          <i className="fa fa-check" />
        </Button>
        <Button
          ghost
          size="small"
          type="danger"
          title="Remover passageiro"
          onClick={() => handleRemove(passenger)}
        >
          <i className="fa fa-times" />
        </Button>
      </div>
    )

    const canceledActions = (
      <div className="table-action-buttons">
        <Button
          ghost
          size="small"
          type="primary"
          title="Reservar passageiro"
          onClick={() => {
            handleBook(passenger.id)
          }}
        >
          <i className="fa fa-check" />
        </Button>
      </div>
    )

    if (statusesEnum.booked === passenger.status) {
      return bookedActions
    }

    if (statusesEnum.waiting === passenger.status) {
      return waitingActions
    }

    if (statusesEnum.canceled === passenger.status) {
      return canceledActions
    }

    throw new Error(`Status ${passenger.status} not defined in statusesEnum`)
  }

  /* CHECK IF THIS IS A TO DO
  const filterData = (passengers) => {
    const {
      filter: { status, query, startPay, fullPay },
    } = props
    let filteredData = passengers

    if (status) filteredData = filteredData.filter((x) => x.status === status)
    if (fullPay) filteredData = filteredData.filter((x) => x.paid === x.total)
    else if (startPay) filteredData = filteredData.filter((x) => x.paid > 0)
    if (query)
      filteredData = filteredData.filter((x) => {
        const queryPart = query.toLowerCase().split(' ')
        return queryPart.every((q) => x.customer.name.toLowerCase().includes(q))
      })

    return filteredData
  } */

  const columnsForStatus = () => {
    const {
      filter: { status },
    } = props

    const allColumns = {
      actions: {
        dataIndex: 'id',
        key: 'id',
        render: (id, row) => renderActionsButtons({ id, status, amountPaid: row.amountPaid }),
      },
      status: {
        title: 'Situação',
        dataIndex: 'status',
        key: 'status',
        className: 'text-center',
        render: () => {
          const { description, type } = statuses.find((s) => s.value === status)
          return <Tag className={`text-white bg-${type} mr-0`}>{description}</Tag>
        },
      },
      name: {
        title: 'Nome',
        dataIndex: 'customer.name',
        key: 'name',
      },
      telephone: {
        title: 'Telefone',
        dataIndex: 'customer.telephone',
        key: 'telephone',
      },
      amountRefunded: {
        title: 'Valor devolvido',
        dataIndex: 'amountRefunded',
        key: 'amountRefunded',
        render: (value) => <span>R$ {value}</span>,
      },
      value: {
        title: 'Valor pago / Valor total',
        dataIndex: 'value',
        key: 'value',
        className: 'text-center',
        render: (_, row) => {
          if (row.status !== statusesEnum.waiting)
            return (
              <span className={row.paidColor}>
                R$ {row.amountPaid} / R$ {row.ticketPrice?.price}
              </span>
            )
          return ''
        },
      },
      ticketType: {
        title: 'Tipo de passagem',
        dataIndex: 'ticketPrice.description',
        key: 'ticketType',
      },
      spot: {
        title: 'Poltrona',
        dataIndex: 'spot',
        key: 'spot',
      },
    }

    switch (status) {
      case statusesEnum.booked:
        return [
          allColumns.actions,
          allColumns.name,
          allColumns.value,
          allColumns.ticketType,
          allColumns.spot,
        ]
      case statusesEnum.waiting:
        return [allColumns.actions, allColumns.name, allColumns.telephone]
      case statusesEnum.canceled:
        return [allColumns.actions, allColumns.name, allColumns.amountRefunded]
      default:
        return [allColumns.status, allColumns.name]
    }
  }

  const tableColumns = columnsForStatus()

  const getPaidColor = (paymentPercent) => {
    if (paymentPercent === 1) {
      return 'text-success'
    }

    if (paymentPercent > 0.5) {
      return 'text-warning'
    }

    return 'text-danger'
  }

  const passengersList = passengers.map((passenger) => {
    const paymentPercent = passenger.amountPaid / passenger.ticketPrice?.price

    const passengerPresenterModified = {
      paidColor: getPaidColor(paymentPercent),
      spot: passenger.spot.number.toString().padStart(2, '0'),
    }

    return { ...passenger, ...passengerPresenterModified }
  })

  const filteredPayments = payments.filter((payment) => payment.status !== 'CANCELED')

  // TODO:
  const filteredData = passengersList // this.filterData(passengersList)

  return (
    <React.Fragment>
      <SkeletonTable
        isLoading={isPassengerLoading}
        tableColumns={tableColumns}
        tableData={filteredData}
      />
      <Modal
        title="Removendo o passageiro da excursão"
        width={700}
        visible={isRemovePassengerVisible}
        cancelText="Cancelar"
        afterClose={clearPassengerStatus}
        okText="Remover"
        okType="danger"
        okCancel
        onCancel={closeDeletePassengerModal}
        footer={[
          <Button onClick={closeDeletePassengerModal} type="default" key="cancel" htmlType="button">
            Cancelar
          </Button>,
          <Button type="danger" form="deletePassengerForm" key="submit" htmlType="submit">
            Remover
          </Button>,
        ]}
      >
        <DeletePassengerForm formId="deletePassengerForm" onSubmit={remove} />
      </Modal>
      <Modal
        title="Troca de passageiro"
        width={700}
        visible={isSwapPassengerVisible}
        afterClose={clearPassengerStatus}
        onCancel={closeSwapPassengerModal}
        footer={[
          <Button onClick={closeSwapPassengerModal} type="default" key="cancel" htmlType="button">
            Cancelar
          </Button>,
          <Button type="primary" form="swapPassengerForm" key="submit" htmlType="submit">
            Trocar passageiro
          </Button>,
        ]}
      >
        <SwapPassengerForm formId="swapPassengerForm" onSubmit={swap} />
      </Modal>
      <Modal
        title="Datas de pagamento"
        width={700}
        visible={isPaymentListVisible}
        onCancel={closePaymentsListModal}
        onOk={closePaymentsListModal}
        afterClose={clearPayments}
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

      <Modal
        title="Atualizar pagamento"
        width={700}
        visible={isPaymentFormVisible}
        onCancel={clearPaymentStatus}
        footer={[
          <Button onClick={clearPaymentStatus} type="default" key="cancel" htmlType="button">
            Cancelar
          </Button>,
          <Button type="primary" form="paymentUpdateForm" key="submit" htmlType="submit">
            Atualizar
          </Button>,
        ]}
      >
        {contentForPaymentsUpdate()}
      </Modal>
    </React.Fragment>
  )
}

export default PassengerList
