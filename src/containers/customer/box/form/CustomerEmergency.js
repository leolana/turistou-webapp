import React from 'react'
import { Row, Col, Form, Input } from 'antd'
import { MaskedInput } from 'react-editmask'

import MASK from 'constants/mask'

export const formFields = ['healthPlan', 'allergy', 'contactName', 'contactPhone']

const CustomerEmergency = ({ form, initialValues }) => {
  return (
    <Row>
      <Col xs={24} md={12}>
        <Form.Item label="Plano de saúde">
          {form.getFieldDecorator('healthPlan', {
            initialValue: initialValues.healthPlan,
            rules: [{ required: false }],
          })(<Input size="default" maxLength={30} />)}
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item label="Alergia a medicamentos">
          {form.getFieldDecorator('allergy', {
            initialValue: initialValues.allergy,
            rules: [{ required: false }],
          })(<Input size="default" maxLength={100} />)}
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={15} lg={18}>
        <Form.Item label="Nome do contato de emergência">
          {form.getFieldDecorator('contactName', {
            initialValue: initialValues.contactName,
            rules: [{ required: false }],
          })(<Input size="default" maxLength={50} />)}
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={9} lg={6}>
        <Form.Item label="Telefone do contato de emergência">
          {form.getFieldDecorator('contactPhone', {
            initialValue: initialValues.contactPhone,
            rules: [{ required: false }],
          })(<MaskedInput className="ant-input" mask={MASK.phone} />)}
        </Form.Item>
      </Col>
    </Row>
  )
}
export default CustomerEmergency
