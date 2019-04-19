import React, { Component } from 'react'
import { Row, Col, Form, Switch, InputNumber, Icon, Button } from 'antd'
// import Price from '../_partial/Price';

class ExcursionPricing extends Component {
  constructor() {
    super()
    this.state = { uniquePrice: true, amountCustomPrices: 0 }
  }

  onChangeUniquePrice = value => {
    let { amountCustomPrices } = this.state
    amountCustomPrices = amountCustomPrices || 1

    this.setState({ uniquePrice: value, amountCustomPrices })
  }

  render() {
    const { form } = this.props
    const { uniquePrice } = this.state
    return (
      <Row>
        <Col xs={24} md={6}>
          <Form.Item label="Valor inteira (padrão)">
            {form.getFieldDecorator('defaultPassagePrice', {
              rules: [{ required: false }],
            })(<InputNumber size="default" maxLength={5} />)}
          </Form.Item>
        </Col>
        <Col xs={24} md={6}>
          <Form.Item label="Mesmo valor para todas as idades">
            {form.getFieldDecorator('uniquePrice', {
              rules: [{ required: false }],
            })(<Switch defaultChecked onChange={this.onChangeUniquePrice} />)}
          </Form.Item>
        </Col>
        <Col md={12}>
          {!uniquePrice && (
            // TODO:
            <Button type="dashed" onClick={this.onClickPlusPrice} className="float-right">
              <Icon type="plus" />
            </Button>
          )}
        </Col>
      </Row>
      // TODO: prices
      // <Row>
      //   {!uniquePrice && (
      //     <Col md={12}>
      //       <Price form={form} {...this.props} />
      //     </Col>
      //   )}
      // </Row>
    )
  }
}
export default ExcursionPricing
