import React, { Component } from 'react'
import { Row, Col, InputNumber, Input, Button, Icon } from 'antd'
import FormItem from 'antd/lib/form/FormItem'

class Transport extends Component {
  render() {
    const { form, index, removeTransport } = this.props

    return (
      <Row>
        <Col xs={24} sm={12}>
          <FormItem label="Trasporte">
            {form.getFieldDecorator(`type[${index}]`, {
              rules: [{ required: false }],
            })(<Input size="default" maxLength={30} />)}
          </FormItem>
        </Col>
        <Col xs={24} sm={6}>
          <FormItem label="Placa">
            {form.getFieldDecorator(`plate[${index}]`, {
              rules: [{ required: false }],
            })(<Input size="default" maxLength={30} />)}
          </FormItem>
        </Col>
        <Col xs={20} sm={3} md={4}>
          <FormItem label="Capacidade">
            {form.getFieldDecorator(`capacity[${index}]`, {
              rules: [{ required: false }],
            })(<InputNumber size="default" maxLength={3} />)}
          </FormItem>
        </Col>
        <Col xs={24} sm={6}>
          <FormItem label="Motorista">
            {form.getFieldDecorator(`driver[${index}]`, {
              rules: [{ required: false }],
            })(<Input size="default" maxLength={30} />)}
          </FormItem>
        </Col>
        <Col xs={4} sm={3} md={2}>
          <Button
            type="danger"
            className="button-side-field float-right"
            onClick={() => removeTransport(index)}
          >
            <Icon type="delete" />
          </Button>
        </Col>
      </Row>
    )
  }
}
export default Transport
