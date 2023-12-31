import React from 'react'
import { Row, Col, Form, Input } from 'antd'
import MaskedInput from 'react-editmask/lib/MaskedInput'

import MASK from 'constants/mask'

export const formFields = ['cellphone', 'telephone', 'email', 'occupation']

const CustomerContact = ({ form, initialValues }) => {
  return (
    <Row>
      <Col xs={24} sm={12} md={6} lg={4}>
        <Form.Item label="Celular">
          {form.getFieldDecorator('cellphone', {
            initialValue: initialValues.cellphone,
            rules: [{ required: true, message: 'Por favor, insira o número celular' }],
          })(<MaskedInput className="ant-input" mask={MASK.cellphone} />)}
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={6} lg={4}>
        <Form.Item label="Telefone">
          {form.getFieldDecorator('telephone', {
            initialValue: initialValues.telephone,
            rules: [{ required: false }],
          })(<MaskedInput className="ant-input" mask={MASK.telephone} />)}
        </Form.Item>
      </Col>
      <Col xs={24} md={12} lg={16}>
        <Form.Item label="E-mail">
          {form.getFieldDecorator('email', {
            initialValue: initialValues.email,
            rules: [{ required: true, message: 'Por favor, insira um endereço de e-mail' }],
          })(<Input size="default" type="email" maxLength={255} />)}
        </Form.Item>
      </Col>

      <Col xs={24} lg={6}>
        <Form.Item label="Profissão">
          {form.getFieldDecorator('occupation', {
            initialValue: initialValues.occupation,
            rules: [{ required: false }],
          })(<Input size="default" maxLength={30} />)}
        </Form.Item>
      </Col>
    </Row>
  )
}
export default CustomerContact
