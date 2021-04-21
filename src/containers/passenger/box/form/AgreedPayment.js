import React, { useCallback, useState } from 'react'
import { Row, Col, Form, Select, InputNumber, DatePicker, Divider, Button } from 'antd'

import { paymentType as paymentTypesList } from 'constants/options'
import InstallmentSelect from 'components/InstallmentSelect/InstallmentSelect'

const dateFormat = 'DD/MM/YYYY'

const AgreedPayment = ({ form, value, onRemove, onChange }) => {
  const [isInstallable, setIsInstallable] = useState(false)

  const triggerChangeForm = useCallback(
    (key, newValue) => {
      const values = form.getFieldsValue()
      onChange({ ...values, [key]: newValue })
    },
    [form, onChange],
  )

  const handleChangePaymentCondition = useCallback(
    (paymentTypeValue) => {
      const filter = paymentTypesList.filter((x) => x.value === paymentTypeValue)
      if (filter.length) {
        setIsInstallable(filter[0].isInstallable)
      }
      triggerChangeForm('paymentType', paymentTypeValue)
    },
    [triggerChangeForm],
  )

  return (
    <Row>
      <Col xs={24} sm={12} lg={6}>
        <Form.Item label="Forma de pagamento">
          {form.getFieldDecorator('paymentType', {
            initialValue: value.paymentType,
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
      <Col xs={18} sm={10} lg={4}>
        <Form.Item label="Valor">
          {form.getFieldDecorator('value', {
            initialValue: value.value,
          })(
            <InputNumber
              precision={2}
              decimalSeparator=","
              onChange={(newValue) => triggerChangeForm('value', newValue)}
            />,
          )}
        </Form.Item>
      </Col>

      <Col xs={24} sm={12} lg={7} hidden={!isInstallable}>
        <Form.Item label="Parcelas">
          {/* TODO: send installment value */}
          {form.getFieldDecorator('installmentQuantity')(
            <InstallmentSelect
              onChange={(newValue) => triggerChangeForm('installmentQuantity', newValue)}
              price={form.getFieldValue('value')}
            />,
          )}
        </Form.Item>
      </Col>

      <Col xs={18} sm={10} lg={5} hidden={!isInstallable}>
        <Form.Item label="Primeira parcela">
          {form.getFieldDecorator('paymentFirstDue')(
            <DatePicker
              format={dateFormat}
              onChange={(newValue) => triggerChangeForm('paymentFirstDue', newValue.startOf('day'))}
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

export default Form.create()(AgreedPayment)
