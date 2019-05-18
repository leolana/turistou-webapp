import React, { Component } from 'react'
import { Row, Col, Form, Input, DatePicker, Radio } from 'antd'
import { MaskedInput } from 'react-editmask'

import MASK from 'constants/mask'
import { genderOptions } from 'constants/options'

export default class CustomerPersonal extends Component {
  render() {
    const { form } = this.props
    const dateFormat = 'DD/MM/YYYY' // TODO: config datepicker

    return (
      <Row>
        <Col span={24}>
          <Form.Item label="Nome">
            {form.getFieldDecorator('name', {
              rules: [{ required: true, message: 'Por favor, insira teu nome' }],
            })(<Input size="default" maxLength={150} />)}
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="CPF">
            {form.getFieldDecorator('cpf', {
              rules: [{ required: false }],
            })(<MaskedInput className="ant-input" mask={MASK.cpf} />)}
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item label="UF emissor">
            {form.getFieldDecorator('stateCpf', {
              rules: [{ required: false }],
            })(<Input size="default" maxLength={2} />)}
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item label="RG">
            {form.getFieldDecorator('rg', {
              rules: [{ required: false }],
            })(<MaskedInput className="ant-input" mask={MASK.rg} />)}
          </Form.Item>
        </Col>
        {/* TODO: validation for age?? */}
        <Col span={4}>
          <Form.Item label="Data de nascimento">
            {form.getFieldDecorator('birthdate', {
              rules: [{ required: false }],
            })(<DatePicker size="default" format={dateFormat} />)}
            {/* TODO: translate DatePicker */}
            {/* TODO: start DatePicker in year view */}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Gênero">
            {form.getFieldDecorator('gender', {
              rules: [{ required: false }],
            })(<Radio.Group options={genderOptions} size="default" />)}
          </Form.Item>
        </Col>
      </Row>
    )
  }
}
