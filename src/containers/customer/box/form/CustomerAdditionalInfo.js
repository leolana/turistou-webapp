import React, { Component } from 'react'
import { Row, Col, Form, Input } from 'antd'

export default class CustomerAdditionalInfo extends Component {
  render() {
    const { form } = this.props

    return (
      <Row>
        <Col sm={12}>
          <Form.Item label="Restrição alimentícia">
            {form.getFieldDecorator('foodRestriction', {
              rules: [{ required: false }],
            })(<Input size="default" maxLength={300} />)}
          </Form.Item>
        </Col>
        <Col sm={12}>
          <Form.Item label="Como o cliente conheceu a agência?">
            {form.getFieldDecorator('howHearAbout', {
              rules: [{ required: false }],
            })(<Input size="default" maxLength={100} />)}
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item label="Observações">
            {form.getFieldDecorator('notes', {
              rules: [{ required: false }],
            })(<Input size="default" maxLength={300} />)}
          </Form.Item>
        </Col>
      </Row>
    )
  }
}
