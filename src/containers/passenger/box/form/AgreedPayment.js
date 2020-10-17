import React, { Component } from 'react'
import { Row, Col, Form, Select, InputNumber, DatePicker, Divider, Button } from 'antd'

import { paymentType as paymentTypesList } from 'constants/options'

const dateFormat = 'DD/MM/YYYY'
const MAX_INSTALLMENT = 10

@Form.create()
class AgreedPayment extends Component {
  constructor() {
    super()
    this.state = { isInstallable: false }

    this.triggerChangeForm = this.triggerChangeForm.bind(this)
    this.handleChangePaymentCondition = this.handleChangePaymentCondition.bind(this)
  }

  triggerChangeForm(key, newValue) {
    const { form, onChange } = this.props
    const values = form.getFieldsValue()
    onChange({ ...values, [key]: newValue })
  }

  handleChangePaymentCondition(value) {
    const filter = paymentTypesList.filter(x => x.value === value)
    if (filter.length) {
      const { isInstallable } = filter[0]
      this.setState({ isInstallable })
    }
    this.triggerChangeForm('paymentType', value)
  }

  render() {
    const { form, value, onRemove } = this.props
    const { isInstallable } = this.state
    const price = form.getFieldValue('value')
    const selectLabel = x => (
      <>
        {x}&times; {`(${price ? (price / x).toFixed(2) : ''})`}
      </>
    )

    return (
      <Row>
        <Col xs={24} sm={12} lg={6}>
          <Form.Item label="Forma de pagamento">
            {form.getFieldDecorator('paymentType', {
              initialValue: value.paymentType,
              rules: [{ required: true }],
            })(
              <Select onChange={this.handleChangePaymentCondition}>
                {paymentTypesList.map(x => (
                  <Select.Option key={x.value} value={x.valueAsString} title={x.label}>
                    {x.label}
                  </Select.Option>
                ))}
              </Select>,
            )}
          </Form.Item>
        </Col>
        <Col xs={18} sm={10} lg={4}>
          <Form.Item label="Valor">
            {form.getFieldDecorator('value', {
              initialValue: value.value,
            })(
              <InputNumber
                precision={2}
                decimalSeparator=","
                onChange={newValue => this.triggerChangeForm('value', newValue)}
              />,
            )}
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} lg={7} hidden={!isInstallable}>
          <Form.Item label="Parcelas">
            {/* TODO: send installment value */}
            {form.getFieldDecorator('installmentQuantity')(
              <Select
                onChange={newValue => this.triggerChangeForm('installmentQuantity', newValue)}
              >
                {Array(MAX_INSTALLMENT)
                  .fill(null)
                  .map((_, i) => i + 1)
                  .map(x => (
                    <Select.Option key={x} value={x}>
                      {x === 1 ? 'À vista / Parcela única' : selectLabel(x)}
                    </Select.Option>
                  ))}
              </Select>,
            )}
          </Form.Item>
        </Col>

        <Col xs={18} sm={10} lg={5} hidden={!isInstallable}>
          <Form.Item label="Primeira parcela">
            {form.getFieldDecorator('paymentFirstDue')(
              <DatePicker
                format={dateFormat}
                onChange={newValue => this.triggerChangeForm('paymentFirstDue', newValue)}
              />,
            )}
          </Form.Item>
        </Col>

        <Col className="float-right" xs={6} sm={2} lg={2}>
          <Button type="danger" className="button-side-field float-right mr-0" onClick={onRemove}>
            <i className="fa fa-trash" />
          </Button>
        </Col>

        <Divider dashed />
      </Row>
    )
  }
}

export default AgreedPayment
