import React, { Component } from 'react'
import { Row, Col, Form, Input } from 'antd'
import MaskedInput from 'react-editmask/lib/MaskedInput'

import MASK from 'constants/mask'

export default class CustomerContact extends Component {
  render() {
    const { form } = this.props

    return (
      <Row>
        <Col span={4}>
          <Form.Item label="Celular">
            {form.getFieldDecorator('cellphone', {
              rules: [{ required: true, message: 'Por favor, insira o número celular' }],
            })(<MaskedInput className="ant-input" mask={MASK.cellphone} />)}
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="Telefone">
            {form.getFieldDecorator('telephone', {
              rules: [{ required: false }],
            })(<MaskedInput className="ant-input" mask={MASK.telephone} />)}
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item label="E-mail">
            {form.getFieldDecorator('email', {
              rules: [{ required: true, message: 'Por favor, insira um endereço de e-mail' }],
            })(<Input size="default" type="email" maxLength={255} />)}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="Profissão">
            {form.getFieldDecorator('occupation', {
              rules: [{ required: false }],
            })(<Input size="default" maxLength={30} />)}
          </Form.Item>
        </Col>
      </Row>
    )
  }
}
