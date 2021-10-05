import React from 'react'
import { Row, Col, Form, Input } from 'antd'

export const formFields = ['foodRestriction', 'howHearAbout', 'notes']

const CustomerAdditionalInfo = ({ form, initialValues }) => {
  return (
    <Row>
      <Col xs={24} sm={12}>
        <Form.Item label="Restrição alimentícia">
          {form.getFieldDecorator('foodRestriction', {
            initialValue: initialValues.foodRestriction,
            rules: [{ required: false }],
          })(<Input size="default" maxLength={100} />)}
        </Form.Item>
      </Col>
      <Col xs={24} sm={12}>
        <Form.Item label="Como o cliente conheceu a agência?">
          {form.getFieldDecorator('howHearAbout', {
            initialValue: initialValues.howHearAbout,
            rules: [{ required: false }],
          })(<Input size="default" maxLength={100} />)}
        </Form.Item>
      </Col>
      <Col xs={24}>
        <Form.Item label="Observações">
          {form.getFieldDecorator('notes', {
            initialValue: initialValues.notes,
            rules: [{ required: false }],
          })(<Input size="default" maxLength={300} />)}
        </Form.Item>
      </Col>
    </Row>
  )
}
export default CustomerAdditionalInfo
