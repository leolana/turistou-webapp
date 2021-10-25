import React, { useCallback, useEffect, useState } from 'react'
import { Row, Col, Button, Form, InputNumber, Divider, Modal } from 'antd'
import Price from './Price'

export const formFields = ['ticketPriceDefault']

const ExcursionPricing = ({ form, initialValues }) => {
  const [prices, setPrices] = useState(null)
  const [setUp, setSetUp] = useState(false)

  const addPrice = useCallback(() => {
    setPrices((prices = []) => {
      const last = prices.length ? prices[prices.length - 1]?.key : 0
      return [...prices, { key: last + 1 }]
    })
  }, [])

  const removePrice = useCallback((key) => {
    Modal.confirm({
      content: `Deseja excluir o preço?`,
      cancelText: 'Não',
      okText: 'Sim',
      onOk: () => setPrices((prices) => prices.filter((x) => key !== x.key)),
    })
  }, [])

  useEffect(() => {
    if (setUp) return
    if (!initialValues.id || !initialValues.ticketPrices) {
      setPrices([])
    } else {
      setPrices(initialValues.ticketPrices.map((x, i) => ({ ...x, key: i })))
      setSetUp(true)
    }
  }, [initialValues, setUp])

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
        {prices?.map((data, index) => (
          <Price index={index} key={data.key} removePrice={removePrice} form={form} data={data} />
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
