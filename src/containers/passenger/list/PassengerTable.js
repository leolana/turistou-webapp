import React, { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLazyQuery } from 'react-apollo'
import { Button, Modal, Tag } from 'antd'

import passengerStatusActions from 'redux/passengerStatus/actions'
import paymentsActions, { FETCH_PAYMENTS, setPassengerEditing } from 'redux/payments/actions'
import paymentStatusActions from 'redux/paymentStatus/actions'
import SkeletonTable from 'components/SkeletonTable/SkeletonTable'
import { PASSENGER_STATUS, PASSENGER_STATUS_ENUM } from 'constants/passengerStatus'

function PassengerTable({ filter }) {
  const dispatch = useDispatch()
  const [fetchPayments, { data: { payments } = {}, loading: isPaymentsLoading }] =
    useLazyQuery(FETCH_PAYMENTS)

  const { isLoading: isPassengerLoading, payload: passengers } = useSelector(
    (state) => state.passengerList,
  )
  const { passengerId } = useSelector((state) => state.payments)

  const tableColumns = useMemo(() => {
    const { status } = filter
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
          const { description, type } = PASSENGER_STATUS.find((s) => s.value === status)
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
          if (row.status !== PASSENGER_STATUS_ENUM.waiting)
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
      case PASSENGER_STATUS_ENUM.booked:
        return [
          allColumns.actions,
          allColumns.name,
          allColumns.value,
          allColumns.ticketType,
          allColumns.spot,
        ]
      case PASSENGER_STATUS_ENUM.waiting:
        return [allColumns.actions, allColumns.name, allColumns.telephone]
      case PASSENGER_STATUS_ENUM.canceled:
        return [allColumns.actions, allColumns.name, allColumns.amountRefunded]
      default:
        return [allColumns.status, allColumns.name]
    }

    // TODO: (Mi) Refatorar e componentizar
    function renderActionsButtons(passenger) {
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

      switch (passenger.status) {
        case PASSENGER_STATUS_ENUM.booked:
          return bookedActions
        case PASSENGER_STATUS_ENUM.waiting:
          return waitingActions
        case PASSENGER_STATUS_ENUM.canceled:
          return canceledActions
        default:
          throw new Error(`Status ${passenger.status} not defined in statusesEnum`)
      }
    }
  }, [filter, getPaymentStatus, getPayments, handleBook, setPassengerToRemove, setPassengerToSwap])

  useEffect(() => {
    dispatch({ type: paymentsActions.TOGGLE_LOADING, payload: isPaymentsLoading })
  }, [dispatch, isPaymentsLoading])

  useEffect(() => {
    if (isPaymentsLoading || !payments?.length || !passengerId) return

    const historyPayment = payments.map((p) => ({ ...p, passengerId }))

    dispatch({ type: paymentsActions.SET_STATE, payload: { payload: historyPayment } })
  }, [isPaymentsLoading, payments, passengerId, dispatch])

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

  const getPayments = useCallback(
    (passengerId) => {
      fetchPayments({ variables: { passengerId } })
      dispatch({ type: paymentsActions.TOGGLE_VISIBILITY, payload: true })
      dispatch(setPassengerEditing(passengerId))
    },
    [fetchPayments, dispatch],
  )

  const getPaymentStatus = useCallback(
    (passengerId) =>
      dispatch({ type: paymentStatusActions.GET_PAYMENT_STATUS, payload: { passengerId } }),
    [dispatch],
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

  const book = useCallback(
    (id) => {
      setStatusToBooked(id)
    },
    [setStatusToBooked],
  )

  const getPaidColor = useCallback((paymentPercent) => {
    if (paymentPercent === 1) {
      return 'text-success'
    }

    if (paymentPercent > 0.5) {
      return 'text-warning'
    }

    return 'text-danger'
  }, [])

  const passengersList = useMemo(
    () =>
      passengers.map((passenger) => {
        const paymentPercent = passenger.amountPaid / passenger.ticketPrice?.price

        const passengerPresenterModified = {
          paidColor: getPaidColor(paymentPercent),
          spot: passenger.spot?.number?.toString().padStart(2, '0'),
        }

        return { ...passenger, ...passengerPresenterModified }
      }),
    [passengers, getPaidColor],
  )

  const filteredData = useMemo(() => {
    if (!passengersList) return []

    const { status, query, startPay, fullPay } = filter
    let filteredData = passengersList

    if (status) filteredData = filteredData.filter((x) => x.status === status)
    if (fullPay) filteredData = filteredData.filter((x) => x.paid === x.total)
    else if (startPay) filteredData = filteredData.filter((x) => x.paid > 0)
    if (query)
      filteredData = filteredData.filter((x) => {
        const queryPart = query.toLowerCase().split(' ')
        return queryPart.every((q) => x.customer.name.toLowerCase().includes(q))
      })

    return filteredData
  }, [filter, passengersList])

  return (
    <SkeletonTable
      isLoading={isPassengerLoading}
      tableColumns={tableColumns}
      tableData={filteredData}
    />
  )
}

export default PassengerTable
