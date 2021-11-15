import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from 'react-apollo'
import { Button, Modal, notification } from 'antd'

import passengerStatusActions, {
  clearPassengerStatus,
  SWAP_PASSENGERS,
} from 'redux/passengerStatus/actions'

import SwapPassengerForm from './SwapPassengerForm'

function SwapPassenger({ afterClose, getPassengers }) {
  const dispatch = useDispatch()
  const [saveSwapPassengers, { loading, error, called }] = useMutation(SWAP_PASSENGERS)

  const { isSwapPassengerVisible, payload: passengerStatus } = useSelector(
    (state) => state.passengerStatus,
  )

  useEffect(() => {
    if (error) {
      notification.error({
        title: 'Falha',
        message: 'Houve uma falha ao fazer a troca de passageiro',
      })
    }
    if (called && !loading) {
      dispatch(clearPassengerStatus({}))
      getPassengers()
    }
  }, [error, loading, called, getPassengers, dispatch])

  const closeSwapPassengerModal = useCallback(
    () =>
      dispatch({ type: passengerStatusActions.TOGGLE_SWAP_PASSENGER_VISIBILITY, payload: false }),
    [dispatch],
  )

  const swapPassengers = useCallback(
    ({ customerId: idOfCustomerToBeSwappedWith }) => {
      const input = { id: passengerStatus.id, idOfCustomerToBeSwappedWith }
      saveSwapPassengers({ variables: { input } })
    },
    [passengerStatus, saveSwapPassengers],
  )

  return (
    <Modal
      title="Troca de passageiro"
      width={700}
      visible={isSwapPassengerVisible}
      afterClose={afterClose}
      onCancel={closeSwapPassengerModal}
      footer={[
        <Button onClick={closeSwapPassengerModal} key="cancel">
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
