import React, { Component } from 'react'
import { Row, Col, Form, Input } from 'antd'
import { MaskedInput } from 'react-editmask'

import MASK from 'constants/mask'

export default class CustomerEmergency extends Component {
  render() {
    const { form } = this.props

    return (
      <Row>
        <Col xs={24} md={12}>
          <Form.Item label="Plano de saúde">
            {form.getFieldDecorator('healthPlan', {
              rules: [{ required: false }],
            })(<Input size="default" maxLength={30} />)}
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Alergia a medicamentos">
            {form.getFieldDecorator('allergy', {
              rules: [{ required: false }],
            })(<Input size="default" maxLength={200} />)}
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={15} lg={18}>
          <Form.Item label="Nome do contato de emergência">
            {form.getFieldDecorator('emergencyName', {
              rules: [{ required: false }],
            })(<Input size="default" maxLength={50} />)}
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={9} lg={6}>
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
