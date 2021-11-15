import React, { useCallback, useState } from 'react'
import { Form, Select, InputNumber, Row, Col, DatePicker } from 'antd'

import { paymentType as paymentTypesList } from 'constants/options'
import InstallmentSelect from 'components/InstallmentSelect/InstallmentSelect'

const PaymentUpdateForm = ({ form, formId, onSubmit, remaining = Number.MAX_SAFE_INTEGER }) => {
  const dateFormat = 'DD/MM/YYYY'

  const [isInstallable, setIsInstallable] = useState(false)
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

  const handleChangePaymentCondition = (paymentTypeValue) => {
    const filter = paymentTypesList.filter((x) => x.value === paymentTypeValue)
    if (filter.length) {
      setIsInstallable(filter[0].isInstallable)
    }
  }

  return (
    <Form id={formId} onSubmit={handleSubmit}>
      <Row>
        <Col sm={12}>
          <Form.Item label="Valor do pagamento">
            {form.getFieldDecorator('value', {
              rules: [{ required: true, message: 'Campo requirido.' }],
            })(<InputNumber min={0} max={remaining} />)}
          </Form.Item>
        </Col>
        <Col sm={12}>
          <Form.Item label="Forma de pagamento">
            {form.getFieldDecorator('paymentType', {
              rules: [{ required: true }],
            })(
              <Select onChange={handleChangePaymentCondition}>
                {paymentTypesList.map((x) => (
                  <Select.Option key={x.value} value={x.value} title={x.label}>
                    {x.label}
                  </Select.Option>
                ))}
              </Select>,
            )}
          </Form.Item>
        </Col>
      </Row>
      {isInstallable ? (
        <Row>
          <Col sm={12}>
            <Form.Item label="Parcelas">
              {form.getFieldDecorator('installmentQuantity')(
                <InstallmentSelect price={form.getFieldValue('value')} />,
              )}
            </Form.Item>
          </Col>
          <Col sm={12}>
            <Form.Item label="Primeira parcela">
              {form.getFieldDecorator('paymentFirstDue')(<DatePicker format={dateFormat} />)}
            </Form.Item>
          </Col>
        </Row>
      ) : (
        ''
      )}
    </Form>
  )
}

export default Form.create()(PaymentUpdateForm)
