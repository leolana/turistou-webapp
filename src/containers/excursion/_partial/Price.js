import React, { Component } from 'react'
import { Row, Col, InputNumber, Input, Switch } from 'antd'
import FormItem from 'antd/lib/form/FormItem'

class Price extends Component {
  render() {
    const { form } = this.props

    return (
      <Row>
        <Col xs={24} sm={12}>
          <FormItem label="Tipo de passagem">
            {form.getFieldDecorator('passageDescription', {
              rules: [{ required: false }],
            })(<Input size="default" maxLength="30" />)}
          </FormItem>
        </Col>
        <Col xs={24} sm={12}>
          <FormItem label="Valor">
            {form.getFieldDecorator('passagePrice', {
              rules: [{ required: false }],
            })(<InputNumber size="default" max="99999" />)}
          </FormItem>
        </Col>

        <Col xs={24} sm={6}>
          <FormItem label="Acima de">
            {form.getFieldDecorator('isFrom', {
              rules: [{ required: false }],
            })(<Switch size="small" />)}
          </FormItem>
        </Col>
        <Col xs={24} sm={6}>
          <FormItem label="Idade">
            {form.getFieldDecorator('fromAge', {
              rules: [{ required: false }],
            })(<InputNumber size="default" max="100000" />)}
          </FormItem>
        </Col>
        <Col xs={24} sm={6}>
          <FormItem label="até">
            {form.getFieldDecorator('isUntil', {
              rules: [{ required: false }],
            })(<Switch size="small" />)}
          </FormItem>
        </Col>
        <Col xs={24} sm={6}>
          <FormItem label="Idade">
            {form.getFieldDecorator('untilAge', {
              rules: [{ required: false }],
            })(<InputNumber size="default" max="200" />)}
          </FormItem>
        </Col>
      </Row>
    )
  }
}
export default Price
