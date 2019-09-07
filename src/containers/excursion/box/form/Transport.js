import React, { Component } from 'react'
import { Row, Col, Input, Button, Select, InputNumber } from 'antd'
import FormItem from 'antd/lib/form/FormItem'

class Transport extends Component {
  render() {
    const { form, index, removeTransport } = this.props

    const availableTransports = [
      {
        id: '123',
        name: 'Ônibus',
      },
      {
        id: '124',
        name: 'Micro-ônibus',
      },
      {
        id: '125',
        name: 'Ônibus duble-deck',
      },
      {
        id: '126',
        name: 'Van',
      },
      {
        id: '127',
        name: 'Trêm',
      },
      {
        id: '128',
        name: 'Carro',
      },
      {
        id: '129',
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
                filterOption={(q, option) =>
                  q
                    .toLowerCase()
                    .split(' ')
                    .every(x => option.props.children.toLowerCase().includes(x))
                }
              >
                {availableTransports.map(x => (
                  <Select.Option value={x.id}>{x.name}</Select.Option>
                ))}
              </Select>,
            )}
          </FormItem>
        </Col>
        {/* <Col xs={24} sm={8}>
          <FormItem label="Trasporte">
            {form.getFieldDecorator(`type[${index}]`, {
              rules: [{ required: false }],
            })(<Input size="default" maxLength={30} />)}
          </FormItem>
        </Col> */}
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
