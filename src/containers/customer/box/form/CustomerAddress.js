import React, { Component } from 'react'
import { Row, Col, Input, InputNumber, Form } from 'antd'
import MaskedInput from 'react-editmask'

import MASK from 'constants/mask'

export default class CustomerAddress extends Component {
  render() {
    const { form } = this.props

    return (
      <Row>
        <Col xs={24} md={4} lg={4}>
          <Form.Item label="CEP">
            {form.getFieldDecorator('zipcode', {
              rules: [{ required: false }],
            })(<MaskedInput className="ant-input" mask={MASK.zipcode} />)}
          </Form.Item>
        </Col>
        <Col xs={24} sm={18} md={16} lg={16}>
          <Form.Item label="Logradouro">
            {form.getFieldDecorator('address', {
              rules: [{ required: false }],
            })(<Input size="default" maxLength={150} />)}
          </Form.Item>
        </Col>
        <Col xs={24} sm={6} md={4} lg={4}>
          <Form.Item label="Número">
            {form.getFieldDecorator('number', {
              rules: [{ required: false }],
            })(<InputNumber size="default" maxLength={7} />)}
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={16} lg={18}>
          <Form.Item label="Bairro">
            {form.getFieldDecorator('area', {
              rules: [{ required: false }],
            })(<Input size="default" maxLength={150} />)}
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Form.Item label="Complemento">
            {form.getFieldDecorator('complement', {
              rules: [{ required: false }],
            })(<Input size="default" maxLength={20} />)}
          </Form.Item>
        </Col>
        <Col xs={24} sm={20} lg={22}>
          <Form.Item label="Cidade">
            {form.getFieldDecorator('city', {
              rules: [{ required: false }],
            })(<Input size="default" maxLength={150} />)}
          </Form.Item>
        </Col>
        <Col xs={24} sm={6} md={4} lg={2}>
          {/* TODO: uppercas */}
          <Form.Item label="UF">
            {form.getFieldDecorator('state', {
              rules: [{ required: false }],
            })(<Input size="default" maxLength={2} />)}
          </Form.Item>
        </Col>
      </Row>
    )
  }
}
