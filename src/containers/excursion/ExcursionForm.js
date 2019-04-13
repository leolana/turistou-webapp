import React, { Component } from 'react'
import { Form, Input, DatePicker, Button, Row, Col, InputNumber, Divider } from 'antd'

@Form.create()
class ExcursionForm extends Component {
  render() {
    const { form, fetching } = this.props
    const dateFormat = 'DD/MM/YYYY'
    return (
      <Form layout="vertical" className="customer-form" onSubmit={this.onSubmit}>
        {/* TODO: Refine all messages required field */}
        {/* TODO: djust layout form */}
        <Divider dashed>Detalhes de viagem</Divider>
        <Row>
          <Col xs={24} md={12}>
            <Form.Item label="Destino">
              {form.getFieldDecorator('destination', {
                rules: [{ required: true, message: 'Por favor, insira o destino' }],
              })(<Input size="default" maxLength="50" />)}
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item label="Endereço de partida">
              {form.getFieldDecorator('departurePoint', {
                rules: [{ required: false }],
              })(<Input size="default" maxLength="15" />)}
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item label="Data da partida">
              {form.getFieldDecorator('departureDate', {
                rules: [{ required: false }],
              })(<DatePicker size="default" format={dateFormat} />)}
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            {/* TODO: time picker or datetime picker */}
            <Form.Item label="Hora da partida">
              {form.getFieldDecorator('departureTime', {
                rules: [{ required: false }],
              })(<DatePicker size="default" format={dateFormat} />)}
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Endereço de chegada">
              {form.getFieldDecorator('departurePoint', {
                rules: [{ required: false }],
              })(<Input size="default" maxLength="15" />)}
            </Form.Item>
          </Col>

          <Col xs={24} md={6}>
            <Form.Item label="Data de retorno">
              {form.getFieldDecorator('regressDate', {
                rules: [{ required: false }],
              })(<DatePicker size="default" format={dateFormat} />)}
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            {/* TODO: time picker or datetime picker */}
            <Form.Item label="Hora de retorno">
              {form.getFieldDecorator('regressTime', {
                rules: [{ required: false }],
              })(<DatePicker size="default" format={dateFormat} />)}
            </Form.Item>
          </Col>
        </Row>

        <Divider dashed>Valores de passagem</Divider>
        <Row>
          <Col xs={24} md={12}>
            <Form.Item label="Valor inteira (padrão)">
              {form.getFieldDecorator('defaultPrice', {
                rules: [{ required: false }],
              })(<InputNumber size="default" maxLength="5" />)}
            </Form.Item>
          </Col>
          {/* TODO: add a toggle for "Mesmo valor para todas as idades" */}
        </Row>

        <Divider dashed>Transportes</Divider>
        <Row>
          <Col xs={24} md={6}>
            {/* TODO: select */}
            <Form.Item label="Trasporte">
              {form.getFieldDecorator('transport', {
                rules: [{ required: false }],
              })(<Input size="default" maxLength="30" />)}
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item label="Placa">
              {form.getFieldDecorator('plate', {
                rules: [{ required: false }],
              })(<Input size="default" maxLength="30" />)}
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item label="Capacidade">
              {form.getFieldDecorator('capacity', {
                rules: [{ required: false }],
              })(<InputNumber size="default" maxLength="3" />)}
            </Form.Item>
          </Col>
          {/* <Col md={6}>
            Vagas preenchidas: TODO: <calculation>
          </Col> */}
        </Row>
        <div className="form-actions">
          <Button
            type="primary"
            className="width-150 mr-4 float-right"
            htmlType="submit"
            loading={fetching}
          >
            Salvar
          </Button>
        </div>
      </Form>
    )
  }
}

export default ExcursionForm
