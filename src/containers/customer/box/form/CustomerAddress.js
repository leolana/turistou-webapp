import React, { Component } from 'react'
import { Row, Col, Input, InputNumber, Form } from 'antd'
import MaskedInput from 'react-editmask'

import MASK from 'constants/mask'

export default class CustomerAddress extends Component {
  render() {
    const { form } = this.props

    return (
      <Row>
        <Col span={4}>
          <Form.Item label="CEP">
            {form.getFieldDecorator('zipcode', {
              rules: [{ required: false }],
            })(<MaskedInput className="ant-input" mask={MASK.zipcode} />)}
          </Form.Item>
        </Col>
        <Col span={16}>
          <Form.Item label="Logradouro">
            {form.getFieldDecorator('address', {
              rules: [{ required: false }],
            })(<Input size="default" maxLength={150} />)}
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="Número">
            {form.getFieldDecorator('number', {
              rules: [{ required: false }],
            })(<InputNumber size="default" maxLength={7} />)}
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Bairro">
            {form.getFieldDecorator('area', {
              rules: [{ required: false }],
            })(<Input size="default" maxLength={150} />)}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Complemento">
            {form.getFieldDecorator('complement', {
              rules: [{ required: false }],
            })(<Input size="default" maxLength={20} />)}
          </Form.Item>
        </Col>
        <Col span={20}>
          <Form.Item label="Cidade">
            {form.getFieldDecorator('city', {
              rules: [{ required: false }],
            })(<Input size="default" maxLength={150} />)}
          </Form.Item>
        </Col>
        <Col span={4}>
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
