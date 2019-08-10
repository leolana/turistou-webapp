import React, { Component } from 'react'
import { Row, Col, Button } from 'antd'

import PaymentConditions from './PaymentConditions'

class PassengerPayment extends Component {
  constructor() {
    super()
    this.state = {
      payments: [1],
      passengerName: 'Fulano da Silva',
      passage: { type: 'Normal', price: 320 },
    }

    this.removePayment = this.removePayment.bind(this)
  }

  addPayment = () => {
    const { payments } = this.state
    const last = payments.length ? payments[payments.length - 1] : 0
    payments.push(last + 1)
    this.setState({ payments })
  }

  removePayment = index => {
    let { payments } = this.state
    payments = payments.filter(x => index !== x)
    this.setState({ payments })
  }

  render() {
    const { payments, passengerName, passage } = this.state

    return (
      <div>
        <Row className="mb-5">
          <Col xs={24} md={12}>
            <b>Passageiro: </b>
            <span>{passengerName}</span>
          </Col>
          <Col xs={24} md={12}>
            <b>Tipo de passagem: </b>
            <span>
              {passage.type} (R$ {passage.price})
            </span>
          </Col>
        </Row>

        {payments.map(x => (
          <PaymentConditions key={x} index={x} removePayment={this.removePayment} {...this.props} />
        ))}

        <Row>
          <Col xs={{ span: 16, offset: 4 }} md={{ span: 8, offset: 8 }}>
            <Button block type="dashed" onClick={this.addPayment}>
              <i className="fa fa-plus mr-3" /> Adicionar pagamento
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default PassengerPayment
