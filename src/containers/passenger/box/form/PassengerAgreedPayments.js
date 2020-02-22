import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Row, Col, Button } from 'antd'

import AgreedPayment from './AgreedPayment'

let conditionLastId = 1

class PassengerAgreedPayments extends Component {
  constructor() {
    super()

    this.handleAddPayment = this.handleAddPayment.bind(this)
    this.handleRemovePayment = this.handleRemovePayment.bind(this)
  }

  handleAddPayment() {
    conditionLastId += 1
    const { form } = this.props
    const keys = form.getFieldValue('keys')
    const nextKeys = keys.concat(conditionLastId)
    form.setFieldsValue({
      keys: nextKeys,
    })
  }

  handleRemovePayment(k) {
    const { form } = this.props
    const keys = form.getFieldValue('keys')
    if (keys.length === 1) return

    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    })
  }

  render() {
    const {
      passengerDetail: { customerName, ticket },
      form,
    } = this.props

    form.getFieldDecorator('keys', { initialValue: [{}] })
    const keys = form.getFieldValue('keys')

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

        {keys.map((k, i) => (
          <Form.Item key={`payment-condition--${k}`}>
            {form.getFieldDecorator(`paymentConditions[${k}]`, {
              initialValue: {},
            })(<AgreedPayment index={i} onRemove={() => this.handleRemovePayment(k)} />)}
          </Form.Item>
        ))}

        <Row type="flex" justify="center">
          <Col xs={16} md={8}>
            <Button block type="dashed" onClick={this.handleAddPayment}>
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
