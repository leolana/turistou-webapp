import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from 'react-apollo'
import { Button, Modal, notification } from 'antd'

import passengerStatusActions, {
  clearPassengerStatus,
  SET_PASSENGER_STATUS,
} from 'redux/passengerStatus/actions'
import { PASSENGER_STATUS_ENUM } from 'constants/passengerStatus'

import DeletePassengerForm from './DeletePassengerForm'

function RemovePassenger({ afterClose, getPassengers }) {
  const dispatch = useDispatch()
  const [savePassengerStatus, { loading, error, called }] = useMutation(SET_PASSENGER_STATUS)

  const { isRemovePassengerVisible, payload: passengerStatus } = useSelector(
    (state) => state.passengerStatus,
  )

  useEffect(() => {
    if (error) {
      notification.error({
        title: 'Falha',
        message: 'Houve uma falha ao remover passageiro da excursão',
      })
    }
    if (called && !loading) {
      dispatch(clearPassengerStatus({}))
      getPassengers()
    }
  }, [error, loading, called, getPassengers, dispatch])

  const closeDeletePassengerModal = useCallback(
    () =>
      dispatch({ type: passengerStatusActions.TOGGLE_REMOVE_PASSENGER_VISIBILITY, payload: false }),
    [dispatch],
  )

  const setStatusToCanceled = useCallback(
    ({ amountRefunded }) => {
      const input = {
        status: PASSENGER_STATUS_ENUM.canceled,
        id: passengerStatus.id,
        amountRefunded,
      }
      savePassengerStatus({ variables: { input } })
    },
    [passengerStatus.id, savePassengerStatus],
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
