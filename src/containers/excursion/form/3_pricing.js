import React, { Component } from 'react'
import { Row, Col, Icon, Button, Form, InputNumber, Input } from 'antd'
import Price from '../_partial/Price'

class ExcursionPricing extends Component {
  constructor() {
    super()
    this.state = { prices: [] }
  }

  addPrice = () => {
    const { prices } = this.state
    const last = prices.length ? prices[prices.length - 1] : -1
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
            {form.getFieldDecorator('defaultPassagePrice', {
              rules: [{ required: false }],
            })(<InputNumber className="ant-input" size="default" maxLength={5} />)}
          </Form.Item>
        </Col>
        <Col xs={24} md={6}>
          <Form.Item label="Valor inteira (padrão)">
            {form.getFieldDecorator('defaultPassagePrice', {
              rules: [{ required: false }],
            })(<Input size="default" maxLength={5} />)}
          </Form.Item>
        </Col>
        <Col xs={0} md={12} />

        <Col xs={24}>
          {prices.map(x => (
            <Price key={x} index={x} removePrice={this.removePrice} {...this.props} />
          ))}
        </Col>

        <Col md={8} pull={8} push={8}>
          <Button className="w-100" type="dashed" onClick={this.addPrice}>
            <Icon type="plus" />
            Adicionar preço
          </Button>
        </Col>
      </Row>
    )
  }
}
export default ExcursionPricing
