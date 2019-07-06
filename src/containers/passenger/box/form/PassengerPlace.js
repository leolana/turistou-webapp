import React, { Component } from 'react'
import { Row, Col, Form, Select } from 'antd'

import { busSeats, busStop } from 'mock/excursionSelects'

class PassengerPlace extends Component {
  render() {
    const { form } = this.props

    return (
      <div>
        <Row className="mb-5">
          <Col xs={24} md={12}>
            <b>Passageiro: </b>
            <span>Fulano da Silva</span>
          </Col>
          <Col xs={24} md={12}>
            <b>Tipo de passagem: </b>
            <span>Normal</span>
          </Col>
        </Row>

        <Row>
          <Col xs={24} sm={8} lg={6}>
            <Form.Item label="Escolha do assento">
              {form.getFieldDecorator('busSeat', { rules: [{ required: false }] })(
                <Select size="default">
                  {busSeats.map(x => (
                    <Select.Option key={x.number} value={x.number} disabled={!x.free}>
                      Poltrona {x.number} {x.free ? '' : ' - Reservado'}
                    </Select.Option>
                  ))}
                </Select>,
              )}
            </Form.Item>
          </Col>

          <Col xs={24} sm={16} lg={18}>
            <Form.Item label="Ponto de embarque">
              {form.getFieldDecorator('stopPoint', { rules: [{ required: false }] })(
                <Select size="default">
                  {busStop.map(x => (
                    <Select.Option key={x.id} value={x.id}>
                      {x.address} - {x.time}
                    </Select.Option>
                  ))}
                </Select>,
              )}
            </Form.Item>
          </Col>
        </Row>
      </div>
    )
  }
}

export default PassengerPlace