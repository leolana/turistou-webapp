import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'

import passengerStatusActions from 'redux/passengerStatus/actions'
import paymentsActions from 'redux/payments/actions'
import paymentStatusActions from 'redux/paymentStatus/actions'

import RemovePassenger from './formModals/delete/DeletePassengerModal'
import SwapPassenger from './formModals/swap/SwapPassengerModal'
import AddPayment from './formModals/updatePayment/PaymentUpdateModal'
import HistoryPayment from './formModals/paymentList/HistoryPaymentModal'
import PassengerTable from './PassengerTable'

const PassengerList = ({ filter, getPassengers }) => {
  const dispatch = useDispatch()

  const clearPassengerStatus = useCallback(
    () => dispatch({ type: passengerStatusActions.CLEAR_PASSENGER_STATUS }),
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

  return (
    <>
      <PassengerTable filter={filter} />

      <RemovePassenger afterClose={clearPassengerStatus} getPassengers={getPassengers} />
      <SwapPassenger afterClose={clearPassengerStatus} getPassengers={getPassengers} />
      <HistoryPayment afterClose={clearPayments} getPassengers={getPassengers} />
      <AddPayment afterClose={clearPaymentStatus} getPassengers={getPassengers} />
    </>
  )
}

export default PassengerList
