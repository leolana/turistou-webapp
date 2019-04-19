import React, { Component } from 'react'
import { Form, Input, Col, Row, DatePicker, TimePicker, Icon, Button } from 'antd'
import StopAddress from '../_partial/StopAddress'
import maps from '../maps.png'

class ExcursionDetail extends Component {
  render() {
    const { form } = this.props
    const dateFormat = 'DD/MM/YYYY'
    const timeFormat = 'HH:mm'
    return (
      <Row>
        <Col md={12}>
          <Row>
            <Col xs={24}>
              <Form.Item label="Destino">
                {form.getFieldDecorator('destination', {
                  rules: [{ required: true, message: 'Por favor, insira o destino' }],
                })(<Input size="default" maxLength="50" />)}
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item label="Endereço de partida">
                {form.getFieldDecorator('departurePoint', {
                  rules: [{ required: false }],
                })(<Input size="default" maxLength="15" />)}
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Data da partida">
                {form.getFieldDecorator('departureDate', {
                  rules: [{ required: false }],
                })(<DatePicker size="default" format={dateFormat} />)}
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item label="Hora da partida">
                {form.getFieldDecorator('departureTime', {
                  rules: [{ required: false }],
                })(<TimePicker size="default" format={timeFormat} minuteStep={5} />)}
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item label="Endereço de chegada">
                {form.getFieldDecorator('departurePoint', {
                  rules: [{ required: false }],
                })(<Input size="default" maxLength="15" />)}
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item label="Data de retorno">
                {form.getFieldDecorator('regressDate', {
                  rules: [{ required: false }],
                })(<DatePicker size="default" format={dateFormat} />)}
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              {/* TODO: time picker or datetime picker */}
              <Form.Item label="Hora de retorno">
                {form.getFieldDecorator('regressTime', {
                  rules: [{ required: false }],
                })(<TimePicker size="default" format={timeFormat} minuteStep={5} />)}
              </Form.Item>
            </Col>
          </Row>
        </Col>

        {/* TODO: google maps */}
        {/* TODO: add stop points */}
        <Col md={12}>
          <Row>
            <Col xs={24}>
              <Button
                type="dashed"
                onClick={this.onClickPlusStopPoint}
                className="float-right mb-2 mt-2"
              >
                <Icon type="plus" />
              </Button>

              <StopAddress form={form} {...this.props} />
            </Col>

            <Col xs={24}>
              <img src={maps} alt="maps" style={{ maxWidth: '100%', maxHeight: '100%' }} />
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}

export default ExcursionDetail
