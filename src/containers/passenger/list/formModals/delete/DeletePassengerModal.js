import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal } from 'antd'

import passengerStatusActions from 'redux/passengerStatus/actions'

import DeletePassengerForm from './DeletePassengerForm'

function RemovePassenger({ afterClose }) {
  const dispatch = useDispatch()

  const { isRemovePassengerVisible, payload: passengerStatus } = useSelector(
    (state) => state.passengerStatus,
  )

  const closeDeletePassengerModal = useCallback(
    () =>
      dispatch({ type: passengerStatusActions.TOGGLE_REMOVE_PASSENGER_VISIBILITY, payload: false }),
    [dispatch],
  )

  const setStatusToCanceled = useCallback(
    ({ amountRefunded }) => {
      const passengerId = passengerStatus.id
      dispatch({
        type: passengerStatusActions.SET_TO_CANCELED,
        payload: { passengerId, amountRefunded },
      })
    },
    [passengerStatus, dispatch],
  )

  return (
    <Modal
      title="Removendo o passageiro da excursão"
      width={700}
      visible={isRemovePassengerVisible}
      cancelText="Cancelar"
      afterClose={afterClose}
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
      <DeletePassengerForm formId="deletePassengerForm" onSubmit={setStatusToCanceled} />
    </Modal>
  )
}

export default RemovePassenger
