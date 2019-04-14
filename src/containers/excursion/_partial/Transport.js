import React, { Component } from 'react'
import { Row, Col, InputNumber, Input } from 'antd'
import FormItem from 'antd/lib/form/FormItem'

class Transport extends Component {
  render() {
    const { form } = this.props

    return (
      <Row>
        <Col xs={24} md={6}>
          {/* TODO: select */}
          <FormItem label="Trasporte">
            {form.getFieldDecorator('transport', {
              rules: [{ required: false }],
            })(<Input size="default" maxLength="30" />)}
          </FormItem>
        </Col>
        <Col xs={24} md={6}>
          <FormItem label="Placa">
            {form.getFieldDecorator('plate', {
              rules: [{ required: false }],
            })(<Input size="default" maxLength="30" />)}
          </FormItem>
        </Col>
        <Col xs={24} md={6}>
          <FormItem label="Capacidade">
            {form.getFieldDecorator('capacity', {
              rules: [{ required: false }],
            })(<InputNumber size="default" maxLength="3" />)}
          </FormItem>
        </Col>
        {/* <Col md={6}>
            Vagas preenchidas: TODO: <calculation>
          </Col> */}
      </Row>
    )
  }
}
export default Transport
