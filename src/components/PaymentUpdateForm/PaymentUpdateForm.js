import React, { useCallback } from 'react'
import { Form, Select, InputNumber } from 'antd'

import paymentMethods from '@constants/paymentMethods'

const PaymentUpdateForm = ({ form, formId, onSubmit }) => {
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
      <Form.Item label="Valor do pagamento">
        {form.getFieldDecorator('value', {
          rules: [{ required: true, message: 'Campo requirido.' }],
        })(<InputNumber />)}
      </Form.Item>
      <Form.Item label="Forma de pagamento">
        {form.getFieldDecorator('method', {
          rules: [{ required: true, message: 'Campo requirido.' }],
        })(
          <Select size="default">
            {Object.keys(paymentMethods).map((key) => (
              <Select.Option key={key} value={key} title={paymentMethods[key]}>
                {paymentMethods[key]}
              </Select.Option>
            ))}
          </Select>,
        )}
      </Form.Item>
    </Form>
  )
}

export default Form.create()(PaymentUpdateForm)
