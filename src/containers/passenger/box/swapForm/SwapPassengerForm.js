import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form } from 'antd'

import CustomerSelect from 'components/CustomerSelect/CustomerSelect'
import passengerStatusActions from 'redux/passengerStatus/actions'

const SwapPassengerForm = ({ form, formId, onSubmit }) => {
  const dispatch = useDispatch()

  const { payload: customers } = useSelector((state) => state.customerList)

  const setPassengerToBeSwappedWith = useCallback(
    (idOfCustomerToBeSwappedWith) =>
      dispatch({
        type: passengerStatusActions.SET_PASSENGER_TO_BE_SWAPPED_WITH,
        payload: { idOfCustomerToBeSwappedWith },
      }),
    [dispatch],
  )
  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault()

      form.validateFieldsAndScroll((err, values) => {
        if (!err && typeof onSubmit === 'function') {
          onSubmit(values)
          form.resetFields()
        }
      })
    },
    [form, onSubmit],
  )

  return (
    <Form id={formId} onSubmit={handleSubmit}>
      <Form.Item label="Trocar passageiro atual pelo(a)">
        {form.getFieldDecorator('customerId', {
          initialValue: null,
          rules: [{ required: true, message: 'Campo requerido.' }],
        })(<CustomerSelect onChange={setPassengerToBeSwappedWith} customerList={customers} />)}
      </Form.Item>
    </Form>
  )
}

export default Form.create()(SwapPassengerForm)
