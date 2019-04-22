import React, { Component } from 'react'
import { Row, Col, InputNumber, Input, Switch, Button, Icon } from 'antd'
import FormItem from 'antd/lib/form/FormItem'

class Price extends Component {
  render() {
    const { form, index, removePrice } = this.props

    return (
      <div className="border-bottom mb-4">
        <Row>
          <Col xs={24} sm={14}>
            <FormItem label="Tipo de passagem">
              {form.getFieldDecorator(`passageDescription[${index}]`, {
                rules: [{ required: false }],
              })(<Input size="default" maxLength={30} />)}
            </FormItem>
          </Col>
          <Col xs={20} sm={8}>
            <FormItem label="Preço">
              {form.getFieldDecorator(`passagePrice[${index}]`, {
                rules: [{ required: false }],
              })(<InputNumber size="default" maxLength={5} />)}
            </FormItem>
          </Col>
          <Col xs={4} md={2}>
            <Button
              type="danger"
              className="button-side-field float-right"
              onClick={() => removePrice(index)}
            >
              <Icon type="delete" />
            </Button>
          </Col>

          <Col xs={24} sm={6}>
            <FormItem label="Acima de">
              {form.getFieldDecorator(`isFrom[${index}]`, {
                rules: [{ required: false }],
              })(<Switch size="small" />)}
            </FormItem>
          </Col>
          <Col xs={24} sm={6}>
            <FormItem label="Idade">
              {form.getFieldDecorator(`fromAge[${index}]`, {
                rules: [{ required: false }],
              })(<InputNumber size="default" maxLength={6} />)}
            </FormItem>
          </Col>
          <Col xs={24} sm={6}>
            <FormItem label="até">
              {form.getFieldDecorator(`isUntil[${index}]`, {
                rules: [{ required: false }],
              })(<Switch size="small" />)}
            </FormItem>
          </Col>
          <Col xs={24} sm={6}>
            <FormItem label="Idade">
              {form.getFieldDecorator(`untilAge[${index}]`, {
                rules: [{ required: false }],
              })(<InputNumber size="default" maxLength={3} />)}
            </FormItem>
          </Col>
        </Row>
      </div>
    )
  }
}
export default Price
