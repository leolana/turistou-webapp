import React from 'react'
import { Row, Col, Input, InputNumber, Form } from 'antd'
import MaskedInput from 'react-editmask'

import MASK from 'constants/mask'

export const formFields = [
  'zipcode',
  'addressLine',
  'number',
  'area',
  'complement',
  'city',
  'state',
]

const CustomerAddress = ({ form, initialValues }) => {
  return (
    <Row>
      <Col xs={24} md={4} lg={4}>
        <Form.Item label="CEP">
          {form.getFieldDecorator('zipcode', {
            initialValue: initialValues.zipcode,
            rules: [{ required: false }],
          })(<MaskedInput className="ant-input" mask={MASK.zipcode} />)}
        </Form.Item>
      </Col>
      <Col xs={24} sm={18} md={16} lg={16}>
        <Form.Item label="Logradouro">
          {form.getFieldDecorator('addressLine', {
            initialValue: initialValues.addressLine,
            rules: [{ required: false }],
          })(<Input size="default" maxLength={150} />)}
        </Form.Item>
      </Col>
      <Col xs={24} sm={6} md={4} lg={4}>
        <Form.Item label="Número">
          {form.getFieldDecorator('number', {
            initialValue: initialValues.number,
            rules: [{ required: false }],
          })(<InputNumber size="default" maxLength={7} />)}
        </Form.Item>
      </Col>

      <Col xs={24} sm={12} md={16} lg={18}>
        <Form.Item label="Bairro">
          {form.getFieldDecorator('area', {
            initialValue: initialValues.area,
            rules: [{ required: false }],
          })(<Input size="default" maxLength={150} />)}
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={8} lg={6}>
        <Form.Item label="Complemento">
          {form.getFieldDecorator('complement', {
            initialValue: initialValues.complement,
            rules: [{ required: false }],
          })(<Input size="default" maxLength={20} />)}
        </Form.Item>
      </Col>
      <Col xs={24} sm={20} lg={22}>
        <Form.Item label="Cidade">
          {form.getFieldDecorator('city', {
            initialValue: initialValues.city,
            rules: [{ required: false }],
          })(<Input size="default" maxLength={150} />)}
        </Form.Item>
      </Col>
      <Col xs={24} sm={6} md={4} lg={2}>
        {/* TODO: uppercas */}
        <Form.Item label="UF">
          {form.getFieldDecorator('state', {
            initialValue: initialValues.state,
            rules: [{ required: false }],
          })(<Input size="default" maxLength={2} />)}
        </Form.Item>
      </Col>
    </Row>
  )
}
export default CustomerAddress
