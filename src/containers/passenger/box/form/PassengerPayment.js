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

    this.removePayment = this.removePayment.bind(this)
    this.addPayment = this.addPayment.bind(this)
    this.removePayment = this.removePayment.bind(this)
  }

  getSelectedCustomer() {
    const { form, customers } = this.props
    const customerId = form.getFieldValue('customerId')
    return customers.find(x => x.id === customerId) || {}
  }

  getSelectedPrice() {
    const { form, excursion } = this.props
    const { ticketPrices, ticketPriceDefault } = excursion
    const ticketPriceId = form.getFieldValue('ticketPriceId')
    return ticketPriceId
      ? ticketPrices.find(x => x.id === ticketPriceId)
      : { price: ticketPriceDefault }
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

    const ticket = this.getSelectedPrice()
    const customer = this.getSelectedCustomer()

    const { form } = this.props
    console.log('\n\n\nform', form.getFieldsValue())

    return (
      <>
        <Row className="mb-5">
          <Col xs={24} md={12}>
            <b>Passageiro: </b>
            <span>{customer.name}</span>
          </Col>
          <Col xs={24} md={12}>
            <b>Tipo de passagem: </b>
            <>
              {ticket.description} (R$ {ticket.price})
            </>
          </Col>
        </Row>

        {payments.map(x => (
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

const mapStateToProps = ({ excursionDetail, customerList }) => ({
  excursion: excursionDetail.payload,
  customers: customerList.payload,
})

export default connect(mapStateToProps)(PassengerPayment)
