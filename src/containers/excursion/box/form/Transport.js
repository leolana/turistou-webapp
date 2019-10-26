import React, { Component } from 'react'
import { Row, Col, Input, Button, Select, InputNumber } from 'antd'
import FormItem from 'antd/lib/form/FormItem'

class Transport extends Component {
  render() {
    const { form, index, removeTransport } = this.props

    const availableTransports = [
      {
        id: 'BUS',
        name: 'Ônibus',
      },
      {
        id: 'MICRO_BUS',
        name: 'Micro-ônibus',
      },
      {
        id: 'DOUBLE_DECK_BUS',
        name: 'Ônibus double-deck',
      },
      {
        id: 'VAN',
        name: 'Van',
      },
      {
        id: 'TRAIN',
        name: 'Trêm',
      },
      {
        id: 'CAR',
        name: 'Carro',
      },
      {
        id: 'AIRPLANE',
        name: 'Avião',
      },
    ]

    return (
      <Row>
        <Col xs={24} sm={7}>
          <FormItem label="Transport">
            {form.getFieldDecorator(`type[${index}]`, { rules: [{ required: true }] })(
              <Select
                showSearch
                filterOption={(query, option) =>
                  query
                    .toLowerCase()
                    .split(' ')
                    .every(x => option.props.children.toLowerCase().includes(x))
                }
              >
                {availableTransports.map((x, availableTransportsIndex) => (
                  <Select.Option key={availableTransportsIndex.toString()} value={x.id}>
                    {x.name}
                  </Select.Option>
                ))}
              </Select>,
            )}
          </FormItem>
        </Col>
        <Col xs={24} sm={4}>
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
            <i className="fa fa-trash" />
          </Button>
        </Col>
      </Row>
    )
  }
}
export default Transport
