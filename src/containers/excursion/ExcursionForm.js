import React, { Component } from 'react'
import {
  Form,
  Input,
  DatePicker,
  Button,
  Row,
  Col,
  InputNumber,
  Divider,
  Switch,
  TimePicker,
  Icon,
} from 'antd'
import Price from './_partial/Price'
import Transport from './_partial/Transport'
import StopAddress from './_partial/StopAddress'

import maps from './maps.png'

@Form.create()
class ExcursionForm extends Component {
  constructor() {
    super()
    this.state = { uniquePrice: true, amountCustomPrices: 0 }
  }

  onChangeUniquePrice = value => {
    let { amountCustomPrices } = this.state
    amountCustomPrices = amountCustomPrices || 1

    this.setState({ uniquePrice: value, amountCustomPrices })
  }

  render() {
    const { form, fetching } = this.props
    const { uniquePrice } = this.state
    const dateFormat = 'DD/MM/YYYY'
    const timeFormat = 'HH:mm'

    return (
      <Form layout="vertical" className="customer-form" onSubmit={this.onSubmit}>
        {/* TODO: Refine all messages required field */}
        {/* TODO: djust layout form */}
        <Divider dashed>Detalhes de viagem</Divider>
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

        <Divider dashed>Valores de passagem</Divider>
        <Row>
          <Col xs={24} md={6}>
            <Form.Item label="Valor inteira (padrão)">
              {form.getFieldDecorator('defaultPassagePrice', {
                rules: [{ required: false }],
              })(<InputNumber size="default" maxLength="5" />)}
            </Form.Item>
          </Col>
          <Col xs={24} md={6}>
            <Form.Item label="Mesmo valor para todas as idades">
              {form.getFieldDecorator('uniquePrice', {
                rules: [{ required: false }],
              })(<Switch defaultChecked onChange={this.onChangeUniquePrice} />)}
            </Form.Item>
          </Col>
          <Col md={12}>
            {!uniquePrice && (
              // TODO:
              <Button type="dashed" onClick={this.onClickPlusPrice} className="float-right">
                <Icon type="plus" />
              </Button>
            )}
          </Col>
        </Row>
        <Row>
          {/* TODO: prices */}

          {!uniquePrice && (
            <Col md={12}>
              <Price form={form} {...this.props} />
            </Col>
          )}
        </Row>

        <Divider dashed>Transportes</Divider>
        {/* TODO: add transport */}
        <Row>
          <Col>
            <Button type="dashed" onClick={this.onClickPlusTransport} className="float-right">
              <Icon type="plus" />
            </Button>
          </Col>
        </Row>
        <Transport form={form} {...this.props} />

        {/*  */}

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
