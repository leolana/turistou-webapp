import React, { useCallback, useMemo, useState } from 'react'
import { Row, Col, Form, Select, InputNumber, DatePicker, Divider, Button } from 'antd'

import { paymentType as paymentTypesList } from 'constants/options'

const dateFormat = 'DD/MM/YYYY'
const MAX_INSTALLMENT = 10

const AgreedPayment = ({ form, value, onRemove, onChange }) => {
  const [isInstallable, setIsInstallable] = useState(false)

  const triggerChangeForm = useCallback((key, newValue) => {
    const values = form.getFieldsValue()
    onChange({ ...values, [key]: newValue })
  }, [form, onChange])

  const handleChangePaymentCondition = useCallback((paymentTypeValue) => {
    const filter = paymentTypesList.filter(x => x.value === paymentTypeValue)
    if (filter.length) {
      setIsInstallable(filter[0].isInstallable)
    }
    triggerChangeForm('paymentType', paymentTypeValue)
  }, [triggerChangeForm])

  const selectLabel = useCallback(x => {
    const price = form.getFieldValue('value')

    return (<>{x}&times; {`(${price ? (price / x).toFixed(2) : ''})`}</>)
  }, [form])

  const installments = useMemo(() =>
    Array(MAX_INSTALLMENT)
      .fill(null)
      .map((_, i) => i + 1)
      .map(x => (
        <Select.Option key={x} value={x}>
          {x === 1 ? 'À vista / Parcela única' : selectLabel(x)}
        </Select.Option>
      ))
    , [selectLabel])

  return (
    <Row>
      <Col xs={24} sm={12} lg={6}>
        <Form.Item label="Forma de pagamento">
          {form.getFieldDecorator('paymentType', {
            initialValue: value.paymentType,
            rules: [{ required: true }],
          })(
            <Select onChange={handleChangePaymentCondition}>
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
        <Form.Item label="Valor">
          {form.getFieldDecorator('value', {
            initialValue: value.value,
          })(
            <InputNumber
              precision={2}
              decimalSeparator=","
              onChange={newValue => triggerChangeForm('value', newValue)}
            />,
          )}
        </Form.Item>
      </Col>

      <Col xs={24} sm={12} lg={7} hidden={!isInstallable}>
        <Form.Item label="Parcelas">
          {/* TODO: send installment value */}
          {form.getFieldDecorator('installmentQuantity')(
            <Select
              onChange={newValue => triggerChangeForm('installmentQuantity', newValue)}
            >
              {installments}
            </Select>,
          )}
        </Form.Item>
      </Col>

      <Col xs={18} sm={10} lg={5} hidden={!isInstallable}>
        <Form.Item label="Primeira parcela">
          {form.getFieldDecorator('paymentFirstDue')(
            <DatePicker
              format={dateFormat}
              onChange={newValue => triggerChangeForm('paymentFirstDue', newValue.startOf('day'))}
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
