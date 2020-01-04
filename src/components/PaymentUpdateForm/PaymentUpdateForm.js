import React, { useCallback } from 'react'
import { Form, Select, InputNumber } from 'antd'
// import PropTypes from 'prop-types'

import { paymentType } from 'constants/options'

const PaymentUpdateForm = ({ form, formId }) => {
  const handleSubmit = useCallback(
    event => {
      event.preventDefault()

      form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
    [form],
  )

  return (
    <Form id={formId} onSubmit={handleSubmit}>
      <Form.Item label="Valor do pagamento">
        {form.getFieldDecorator('value', {
          rules: [{ required: true }],
        })(<InputNumber />)}
      </Form.Item>
      <Form.Item label="Forma de pagamento">
        {form.getFieldDecorator('operation', {
          rules: [{ required: true }],
        })(
          <Select size="default">
            {paymentType.map(x => (
              <Select.Option key={x.value} value={x.value} title={x.label}>
                {x.label}
              </Select.Option>
            ))}
          </Select>,
        )}
      </Form.Item>
    </Form>
  )
}

export default Form.create()(PaymentUpdateForm)
