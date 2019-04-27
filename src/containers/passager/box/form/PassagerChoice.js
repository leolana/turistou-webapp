import React, { Component } from 'react'
import { Row, Col, Form, Select, Radio } from 'antd'

import { tableData } from 'mock/customers'

const passagePrices = [
  { id: 0, description: 'Normal', price: '320,00' },
  { id: 1, description: 'Estudante', price: '200,00' },
  { id: 2, description: 'Idoso', price: '189,90' },
]

class PassagerChoice extends Component {
  constructor() {
    super()
    this.state = { price: null }
  }

  componentDidMount() {
    this.setState({ price: '320,00' })
  }

  onChangePassage = event => {
    const id = event.target.value
    const selected = passagePrices.find(x => x.id === id)
    if (selected) this.setState({ price: selected.price })
  }

  render() {
    const { form } = this.props
    const { price } = this.state
    const options = passagePrices.map(x => ({ value: x.id, label: x.description }))

    return (
      <div>
        <Row>
          <Col>
            <Form.Item label="Cliente">
              {form.getFieldDecorator('customer', {
                rules: [{ required: false }],
              })(
                <Select size="default" maxLength={15}>
                  {tableData.map(x => (
                    <Select.Option key={x.id} value={x.id}>
                      {x.name} - {x.city}
                    </Select.Option>
                  ))}
                </Select>,
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col md={18}>
            <Form.Item label="Tipos de passagem">
              {form.getFieldDecorator('passagePrice', { rules: [{ required: false }] })(
                <Radio.Group
                  options={options}
                  size="default"
                  initialValue={0}
                  onChange={this.onChangePassage}
                />,
              )}
            </Form.Item>
          </Col>
          <Col md={6}>
            <div>Valor:</div>
            R$ {price}
          </Col>
        </Row>
      </div>
    )
  }
}

export default PassagerChoice
