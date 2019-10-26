import React, { Component } from 'react'
import { Row, Col, Button, Form, InputNumber, Divider } from 'antd'
import Price from './Price'

export const formFields = ['ticketPriceDefault']

class ExcursionPricing extends Component {
  constructor() {
    super()
    this.state = { prices: [] }
  }

  addPrice = () => {
    const { prices } = this.state
    const last = prices.length ? prices[prices.length - 1] : 0
    prices.push(last + 1)
    this.setState({ prices })
  }

  removePrice = index => {
    let { prices } = this.state
    prices = prices.filter(x => index !== x)
    this.setState({ prices })
  }

  render() {
    const { form } = this.props
    const { prices } = this.state

    return (
      <Row>
        <Col xs={24} md={6}>
          <Form.Item label="Valor inteira (padrão)">
            {form.getFieldDecorator('ticketPriceDefault', {
              rules: [{ required: true }],
            })(<InputNumber className="ant-input" maxLength={5} />)}
          </Form.Item>
        </Col>
        <Col xs={0} md={12} />

        <Divider dashed />

        <Col xs={24}>
          {prices.map((x, index) => (
            <Price
              key={index.toString()}
              index={x}
              removePrice={this.removePrice}
              {...this.props}
            />
          ))}
        </Col>

        <Col xs={{ span: 16, offset: 4 }} md={{ span: 8, offset: 8 }}>
          <Button block type="dashed" onClick={this.addPrice}>
            <i className="fa fa-plus mr-3" />
            Adicionar preço
          </Button>
        </Col>
      </Row>
    )
  }
}
export default ExcursionPricing
