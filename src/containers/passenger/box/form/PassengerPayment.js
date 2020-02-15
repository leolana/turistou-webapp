import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button } from 'antd'

import PaymentConditions from './PaymentConditions'

class PassengerPayment extends Component {
  constructor() {
    super()
    this.state = {
      payments: [1],
    }

    this.addPayment = this.addPayment.bind(this)
    this.removePayment = this.removePayment.bind(this)
  }

  addPayment() {
    const { payments } = this.state
    const last = payments.length ? payments[payments.length - 1] : 0
    payments.push(last + 1)
    this.setState({ payments })
  }

  removePayment(index) {
    let { payments } = this.state
    payments = payments.filter(x => index !== x)
    this.setState({ payments })
  }

  render() {
    const { payments } = this.state
    const {
      passengerDetail: { customerName, ticket },
    } = this.props

    const { form } = this.props
    console.log('\n\n\nform', form.getFieldsValue())

    return (
      <>
        <Row className="mb-5">
          <Col xs={24} md={12}>
            <b>Passageiro: </b>
            <span>{customerName}</span>
          </Col>
          <Col xs={24} md={12}>
            <b>Tipo de passagem: </b>
            {ticket && (
              <>
                {ticket.description}(R$ {ticket.price})
              </>
            )}
          </Col>
        </Row>

        {ticket &&
          payments.map(x => (
            <PaymentConditions
              key={x}
              index={x}
              removePayment={this.removePayment}
              price={ticket.price}
              {...this.props}
            />
          ))}

        <Row>
          <Col xs={{ span: 16, offset: 4 }} md={{ span: 8, offset: 8 }}>
            <Button block type="dashed" onClick={this.addPayment}>
              <i className="fa fa-plus mr-3" /> Adicionar pagamento
            </Button>
          </Col>
        </Row>
      </>
    )
  }
}

const mapStateToProps = ({ excursionDetail, passengerDetail: { customerName, ticket } }) => ({
  excursion: excursionDetail.payload,
  passengerDetail: { customerName, ticket },
})

export default connect(mapStateToProps)(PassengerPayment)
