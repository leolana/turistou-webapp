import React, { useCallback, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Tag, Modal } from 'antd'

import passengerStatusActions from 'redux/passengerStatus/actions'
import paymentsActions from 'redux/payments/actions'
import paymentStatusActions from 'redux/paymentStatus/actions'

import SkeletonTable from 'components/SkeletonTable/SkeletonTable'

import RemovePassenger from './formModals/delete/DeletePassengerModal'
import SwapPassenger from './formModals/swap/SwapPassengerModal'
import AddPayment from './formModals/updatePayment/PaymentUpdateModal'
import HistoryPayment from './formModals/paymentList/HistoryPaymentModal'

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
    ({ id, amountPaid }) =>
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

  const setStatusToBooked = useCallback(
    (passengerId) =>
      dispatch({ type: passengerStatusActions.SET_TO_BOOKED, payload: { passengerId } }),
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

  const clearPayments = useCallback(
    () => dispatch({ type: paymentsActions.SET_STATE, payload: [] }),
    [dispatch],
  )
  const clearPaymentStatus = useCallback(
    () => dispatch({ type: paymentStatusActions.CLEAR_PAYMENT_STATUS }),
    [dispatch],
  )

  const { isLoading: isPassengerLoading, payload: passengers } = useSelector(
    (state) => state.passengerList,
  )

  const book = useCallback(
    (id) => {
      setStatusToBooked(id)
    },
    [setStatusToBooked],
  )

  const handleBook = useCallback(
    (id) => {
      Modal.confirm({
        okCancel: true,
        cancelText: 'Não',
        okText: 'Sim',
        title: 'Confirmar reserva',
        content: 'Deseja confirmar o passageiro à excursão?',
        onOk: () => book(id),
      })
    },
    [book],
  )

  const renderActionsButtons = useCallback(
    (passenger) => {
      const bookedActions = (
        <div className="table-action-buttons">
          <Button
            ghost
            size="small"
            type="primary"
            title="Atualizar pagamento"
            onClick={() => {
              getPaymentStatus(passenger.id)
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
              getPayments(passenger.id)
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
              setPassengerToSwap(passenger.id)
            }}
          >
            <i className="fa fa-exchange" />
          </Button>
          <Button
            ghost
            size="small"
            type="danger"
            title="Passageiro desistiu"
            onClick={() => setPassengerToRemove(passenger)}
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
            onClick={() => setPassengerToRemove(passenger)}
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
    },
    [getPaymentStatus, getPayments, setPassengerToSwap, setPassengerToRemove, handleBook],
  )

  /* TODO: (Mi) fazer o filtro funcionar 
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
      spot: passenger.spot?.number?.toString().padStart(2, '0'),
    }

    return { ...passenger, ...passengerPresenterModified }
  })

  const filteredData = useMemo(
    () => passengersList /* TODO: .filterData(passengersList) */,
    [passengersList],
  )

  return (
    <>
      <SkeletonTable
        isLoading={isPassengerLoading}
        tableColumns={tableColumns}
        tableData={filteredData}
      />

      <RemovePassenger afterClose={clearPassengerStatus} />

      <SwapPassenger afterClose={clearPassengerStatus} />

      <HistoryPayment afterClose={clearPayments} />

      <AddPayment afterClose={clearPaymentStatus} />
    </>
  )
}

export default PassengerList
