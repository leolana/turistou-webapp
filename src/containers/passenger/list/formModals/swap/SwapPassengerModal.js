import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal } from 'antd'

import passengerStatusActions from 'redux/passengerStatus/actions'

import SwapPassengerForm from './SwapPassengerForm'

function SwapPassenger({ afterClose }) {
  const dispatch = useDispatch()

  const { isSwapPassengerVisible, payload: passengerStatus } = useSelector(
    (state) => state.passengerStatus,
  )

  const swapPassengers = useCallback(
    ({ customerId: idOfCustomerToBeSwappedWith }) => {
      dispatch({
        type: passengerStatusActions.SWAP_PASSENGERS,
        payload: { id: passengerStatus.id, idOfCustomerToBeSwappedWith },
      })
    },
    [passengerStatus, dispatch],
  )

  const closeSwapPassengerModal = useCallback(
    () =>
      dispatch({ type: passengerStatusActions.TOGGLE_SWAP_PASSENGER_VISIBILITY, payload: false }),
    [dispatch],
  )

  return (
    <Modal
      title="Troca de passageiro"
      width={700}
      visible={isSwapPassengerVisible}
      afterClose={afterClose}
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
      <SwapPassengerForm formId="swapPassengerForm" onSubmit={swapPassengers} />
    </Modal>
  )
}

export default SwapPassenger
