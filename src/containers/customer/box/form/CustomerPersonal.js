import React from 'react'
import { Row, Col, Form, Input, DatePicker, Radio } from 'antd'
import { MaskedInput } from 'react-editmask'

import MASK from 'constants/mask'
import { genderOptions } from 'constants/options'

export const formFields = [
  'name',
  'cpf',
  'documentNumber',
  'documentDispatcher',
  'documentDispatcherState',
  'birthDate',
  'gender',
]

const dateFormat = 'DD/MM/YYYY' // TODO: config datepicker
const CustomerPersonal = ({ form }) => {
  return (
    <Row>
      <Col xs={24}>
        <Form.Item label="Nome">
          {form.getFieldDecorator('name', {
            rules: [{ required: true, message: 'Por favor, insira teu nome' }],
          })(<Input size="default" maxLength={150} />)}
        </Form.Item>
      </Col>

      <Col xs={24} sm={12} lg={4}>
        <Form.Item label="CPF">
          {form.getFieldDecorator('cpf', {
            rules: [{ required: false }],
          })(<MaskedInput className="ant-input" mask={MASK.cpf} />)}
        </Form.Item>
      </Col>

      <Col xs={24} sm={6} lg={4}>
        <Form.Item label="RG">
          {form.getFieldDecorator('documentNumber', {
            rules: [{ required: false }],
          })(<MaskedInput className="ant-input" mask={MASK.rg} />)}
        </Form.Item>
      </Col>
      <Col xs={24} sm={3} lg={2}>
        <Form.Item label="Órgão emissor">
          {form.getFieldDecorator('documentDispatcher', {
            rules: [{ required: false }],
          })(<Input size="default" maxLength={5} placeholder="SSP" />)}
        </Form.Item>
      </Col>
      <Col xs={24} sm={3} lg={2}>
        <Form.Item label="UF emissor">
          {form.getFieldDecorator('documentDispatcherState', {
            rules: [{ required: false }],
          })(<Input size="default" maxLength={2} />)}
        </Form.Item>
      </Col>

      {/* TODO: validation for age?? */}
      <Col xs={24} sm={6} lg={4}>
        <Form.Item label="Data de nascimento">
          {form.getFieldDecorator('birthDate', {
            rules: [{ required: false }],
          })(<DatePicker size="default" format={dateFormat} />)}
          {/* TODO: translate DatePicker */}
          {/* TODO: start DatePicker in year view */}
        </Form.Item>
      </Col>
      <Col xs={24} lg={8}>
        <Form.Item label="Gênero">
          {form.getFieldDecorator('gender', {
            rules: [{ required: false }],
          })(<Radio.Group options={genderOptions} size="default" />)}
        </Form.Item>
      </Col>
    </Row>
  )
}

export default CustomerPersonal
