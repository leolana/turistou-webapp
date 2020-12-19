import React, { useCallback, useEffect, useState } from 'react'
import { Row, Col, Button, Form, InputNumber, Divider } from 'antd'
import Price from './Price'

export const formFields = ['ticketPriceDefault']

const ExcursionPricing = ({ form, initialValues }) => {
  const [prices, setPrices] = useState(null)

  const addPrice = useCallback(() => {
    setPrices((prices) => {
      const last = prices.length ? prices[prices.length - 1] : 0
      prices.push(last + 1)
      return prices
    })
  }, [])

  const removePrice = useCallback((index) => {
    setPrices((prices) => prices.filter((x) => index !== x))
  }, [])

  useEffect(() => {
    if (!initialValues.id) {
      setPrices([])
    } else if (prices === null) {
      setPrices(initialValues.ticketPrices.map((x, i) => ({ ...x, key: i })))
    }
  }, [initialValues, prices])

  form.getFieldDecorator('priceKeys', { initialValue: prices || [] })
  const priceKeys = form.getFieldValue('priceKeys')

  return (
    <Row>
      <Col xs={24} md={6}>
        <Form.Item label="Valor inteira (padrão)">
          {form.getFieldDecorator('ticketPriceDefault', {
            initialValue: initialValues?.ticketPriceDefault,
            rules: [{ required: true, message: 'Por favor, insira o valor inteira (padrão)' }],
          })(<InputNumber className="ant-input" maxLength={5} />)}
        </Form.Item>
      </Col>
      <Col xs={0} md={12} />

      <Divider dashed />

      <Col xs={24}>
        {priceKeys.map((data, index) => (
          <Price key={index.toString()} data={data} removePrice={removePrice} form={form} />
        ))}
      </Col>

      <Col xs={{ span: 16, offset: 4 }} md={{ span: 8, offset: 8 }}>
        <Button block type="dashed" onClick={addPrice}>
          <i className="fa fa-plus mr-3" />
          Adicionar preço
        </Button>
      </Col>
    </Row>
  )
}
export default ExcursionPricing
