import React, { Component } from 'react'
import { Row, Col, Form, Input } from 'antd'
import { MaskedInput } from 'react-editmask'

import MASK from 'constants/mask'

export default class CustomerEmergency extends Component {
  render() {
    const { form } = this.props

    return (
      <Row>
        <Col span={4}>
          <Form.Item label="Plano de saúde">
            {form.getFieldDecorator('healthPlan', {
              rules: [{ required: false }],
            })(<Input size="default" maxLength={30} />)}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Alergia a medicamentos">
            {form.getFieldDecorator('allergy', {
              rules: [{ required: false }],
            })(<Input size="default" maxLength={200} />)}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="Nome do contato de emergência">
            {form.getFieldDecorator('emergencyName', {
              rules: [{ required: false }],
            })(<Input size="default" maxLength={50} />)}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="Telefone do contato de emergência">
            {form.getFieldDecorator('emergencyCellphone', {
              rules: [{ required: false }],
            })(<MaskedInput className="ant-input" mask={MASK.phone} />)}
          </Form.Item>
        </Col>
      </Row>
    )
  }
}
