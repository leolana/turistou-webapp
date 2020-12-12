import React from 'react'
import { Form, Input, Col, Row, DatePicker, TimePicker } from 'antd'
import moment from 'moment'

export const formFields = [
  'destination',
  'departurePoint',
  'departureDate',
  'departureTime',
  'arrivalPoint',
  'regressDate',
  'regressDate',
  'regressTime',
]

const ExcursionDetail = ({ form, data }) => {
  console.debug('data', data)

  const dateFormat = 'DD/MM/YYYY'
  const timeFormat = 'HH:mm'
  return (
    <Row>
      <Col xs={24}>
        <Form.Item label="Destino">
          {form.getFieldDecorator('destination', {
            initialValue: data.destination,
            rules: [{ required: true, message: 'Por favor, insira o destino' }],
          })(<Input size="default" maxLength={50} />)}
        </Form.Item>
      </Col>

      <Col xs={24} md={12}>
        <Form.Item label="Endereço de partida">
          {form.getFieldDecorator('departurePoint', {
            initialValue: data.departurePoint,
            rules: [{ required: false }],
          })(<Input size="default" maxLength={500} />)}
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item label="Endereço de chegada">
          {form.getFieldDecorator('arrivalPoint', {
            initialValue: data.arrivalPoint,
            rules: [{ required: false }],
          })(<Input size="default" maxLength={500} />)}
        </Form.Item>
      </Col>

      <Col xs={24} sm={12} md={6}>
        <Form.Item label="Data da partida">
          {form.getFieldDecorator('departureDate', {
            initialValue: moment(data.departureDate),
            rules: [{ required: false }],
          })(<DatePicker size="default" format={dateFormat} />)}
        </Form.Item>
      </Col>
      {/* TODO: juntar data e hora em um campo para enviar para a api e separar quando receber */}
      <Col xs={24} sm={12} md={6}>
        <Form.Item label="Hora da partida">
          {form.getFieldDecorator('departureTime', {
            initialValue: data.departureTime,
            rules: [{ required: false }],
          })(<TimePicker size="default" format={timeFormat} minuteStep={5} />)}
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Form.Item label="Data de retorno">
          {form.getFieldDecorator('regressDate', {
            initialValue: moment(data.regressDate),
            rules: [{ required: false }],
          })(<DatePicker size="default" format={dateFormat} />)}
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={6}>
        {/* TODO: time picker or datetime picker */}
        <Form.Item label="Hora de retorno">
          {form.getFieldDecorator('regressTime', {
            initialValue: data.regressTime,
            rules: [{ required: false }],
          })(<TimePicker size="default" format={timeFormat} minuteStep={5} />)}
        </Form.Item>
      </Col>
    </Row>
  )
}

export default ExcursionDetail
