import React, { Component } from 'react'
import { Row, Col, Form, Checkbox, InputNumber } from 'antd'

const checkboxSpan = 2
const inputSpan = 6

class PassengerPayment extends Component {
  render() {
    const { form } = this.props

    return (
      <div>
        <Row className="mb-5">
          <Col md={12}>
            <b>Passageiro: </b>
            <span>Fulano da Silva</span>
          </Col>
          <Col md={12}>
            <b>Tipo de passagem: </b>
            <span>Normal</span>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <Row>
              <Col xs={2} md={checkboxSpan}>
                <Form.Item label="">
                  {form.getFieldDecorator('hasMoney', { rules: [{ required: false }] })(
                    <Checkbox />,
                  )}
                </Form.Item>
              </Col>
              <Col xs={22} md={inputSpan}>
                <Form.Item label="Em dinheiro">
                  {form.getFieldDecorator('money', { rules: [{ required: false }] })(
                    <InputNumber maxLength="7" />,
                  )}
                </Form.Item>
              </Col>

              <Col xs={2} md={checkboxSpan}>
                <Form.Item label="">
                  {form.getFieldDecorator('hasMoney', { rules: [{ required: false }] })(
                    <Checkbox />,
                  )}
                </Form.Item>
              </Col>
              <Col xs={22} md={inputSpan}>
                <Form.Item label="Transferencia">
                  {form.getFieldDecorator('money', { rules: [{ required: false }] })(
                    <InputNumber maxLength="7" />,
                  )}
                </Form.Item>
              </Col>
              <Col xs={2} md={checkboxSpan}>
                <Form.Item label="">
                  {form.getFieldDecorator('hasMoney', { rules: [{ required: false }] })(
                    <Checkbox />,
                  )}
                </Form.Item>
              </Col>
              <Col xs={22} md={inputSpan}>
                <Form.Item label="Depósito">
                  {form.getFieldDecorator('money', { rules: [{ required: false }] })(
                    <InputNumber maxLength="7" />,
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Col>

          <Col md={12}>
            <Row>
              <Col xs={2} md={2}>
                <Form.Item label="">
                  {form.getFieldDecorator('hasMoney', { rules: [{ required: false }] })(
                    <Checkbox />,
                  )}
                </Form.Item>
              </Col>
              <Col xs={22} md={inputSpan}>
                <Form.Item label="Boleto">
                  {form.getFieldDecorator('money', { rules: [{ required: false }] })(
                    <InputNumber maxLength="7" />,
                  )}
                </Form.Item>
              </Col>
              <Col xs={22} md={8}>
                <Form.Item label="Vencimento">
                  {form.getFieldDecorator('money', { rules: [{ required: false }] })(
                    <InputNumber maxLength="7" />,
                  )}
                </Form.Item>
              </Col>
              <Col xs={22} md={8}>
                <Form.Item label="Parcelas">
                  {form.getFieldDecorator('money', { rules: [{ required: false }] })(
                    <InputNumber maxLength="7" />,
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

export default PassengerPayment
