import React, { Component } from 'react'
import { Row, Col, Form, Select, InputNumber } from 'antd'

import { paymentType as paymentTypesList } from 'constants/options'

@Form.create()
class AgreedPayment extends Component {
  constructor() {
    super()

    this.triggerChangeForm = this.triggerChangeForm.bind(this)
  }

  triggerChangeForm() {
    const { form, onChange } = this.props
    const values = form.getFieldsValue()
    onChange(values)
  }

  render() {
    const { form, value } = this.props

    return (
      <Row>
        <Col xs={24} sm={12} lg={6}>
          <Form.Item label="Forma de pagamento" onChange={this.triggerChangeForm}>
            {form.getFieldDecorator('paymentType', {
              initialValue: value.paymentType,
              rules: [{ required: true }],
            })(
              <Select>
                {paymentTypesList.map(x => (
                  <Select.Option key={x.value} value={x.value} title={x.label}>
                    {x.label}
                  </Select.Option>
                ))}
              </Select>,
            )}
          </Form.Item>
        </Col>
        <Col xs={18} sm={10} lg={4}>
          <Form.Item label="Valor" onChange={this.triggerChangeForm}>
            {form.getFieldDecorator('value', {
              initialValue: value.value,
            })(<InputNumber precision={2} decimalSeparator="," />)}
          </Form.Item>
        </Col>
      </Row>
    )
  }
}

export default AgreedPayment
