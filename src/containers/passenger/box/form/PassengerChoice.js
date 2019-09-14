import React, { Component } from 'react'
import { Row, Col, Form, Radio } from 'antd'

import { tableData } from 'mock/customers'
import CustomerSelect from 'components/CustomerSelect/CustomerSelect'

const passagePrices = [
  { id: 0, description: 'Normal', price: '320,00' },
  { id: 1, description: 'Estudante', price: '200,00' },
  { id: 2, description: 'Idoso', price: '189,90' },
]

class PassengerChoice extends Component {
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
          <Col xs={24}>
            <Form.Item label="Cliente">
              {form.getFieldDecorator('customer', {
                rules: [{ required: false }],
              })(<CustomerSelect customers={tableData} />)}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xs={24}>
            <Form.Item label="Tipos de passagem">
              {form.getFieldDecorator('ticketPriceId', { rules: [{ required: false }] })(
                <Radio.Group
                  options={options}
                  size="default"
                  initialValue={null}
                  onChange={this.onChangePassage}
                />,
              )}
            </Form.Item>
          </Col>
          <Col xs={24}>
            <div>
              Valor: <b>R$ {price}</b>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default PassengerChoice
