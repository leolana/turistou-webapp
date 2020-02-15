import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Row, Col, Button } from 'antd'

import AgreedPayment from './AgreedPayment'

class PassengerAgreedPayments extends Component {
  constructor() {
    super()
    this.state = { conditionsAmount: 1 }

    this.addPayment = this.addPayment.bind(this)
    this.removePayment = this.removePayment.bind(this)
  }

  addPayment() {
    const { conditionsAmount } = this.state

    this.setState({ conditionsAmount: conditionsAmount + 1 })
  }

  removePayment(index) {
    const {
      form: { getFieldValue, setFieldsValue },
    } = this.props
    let paymentCondition = getFieldValue('paymentCondition')
    paymentCondition = paymentCondition.filter(x => index !== x)
    setFieldsValue({ paymentCondition })
  }

  render() {
    const { conditionsAmount } = this.state
    const {
      passengerDetail: { customerName, ticket },
    } = this.props

    const { form } = this.props
    console.log('\n\n\nform', form.getFieldsValue())

    const paymentMap = Array(conditionsAmount)
      .fill(null)
      .map((_, i) => i + 1)
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

        {paymentMap.map((condition, i) => (
          <Form.Item key={`payment-condition--${i}`}>
            {form.getFieldDecorator(`paymentCondition[${i}]`, {
              initialValue: condition,
            })(<AgreedPayment index={i} />)}
          </Form.Item>
        ))}

        <Row type="flex" justify="center">
          <Col xs={16} md={8}>
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

export default connect(mapStateToProps)(PassengerAgreedPayments)
