import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Form, Radio } from 'antd'

import passengerActions from 'redux/passengerDetail/actions'
import CustomerSelect from 'components/CustomerSelect/CustomerSelect'

class PassengerChoice extends Component {
  constructor() {
    super()

    this.storagePassengerTicket = this.storagePassengerTicket.bind(this)
    this.storagePassengerName = this.storagePassengerName.bind(this)
  }

  getTicketOptions() {
    const {
      excursion: { ticketPrices, ticketPriceDefault },
    } = this.props
    const options = (ticketPrices || []).map(x => ({
      value: x.id,
      label: x.description,
      price: x.price,
    }))
    options.unshift({ value: 0, label: 'Passagem normal', price: ticketPriceDefault })
    return options
  }

  getSelectedTicket(id) {
    if (id === undefined) {
      const { form } = this.props
      id = form.getFieldValue('ticketPriceId')
    }

    return this.getTicketOptions().find(x => x.value === id)
  }

  storagePassengerName(customerId) {
    const { customers, storagePassenger } = this.props

    const customer = customers.find(x => x.id === customerId) || {}

    storagePassenger({ customerName: customer.name || 'Alguém' })
  }

  storagePassengerTicket(ticketPriceId) {
    const { excursion, storagePassenger } = this.props
    const { ticketPrices, ticketPriceDefault } = excursion

    const ticket = ticketPriceId
      ? ticketPrices.find(x => x.id === ticketPriceId)
      : { description: 'Normal', price: ticketPriceDefault }

    storagePassenger({
      ticket: {
        description: ticket.description,
        price: ticket.price,
      },
    })
  }

  render() {
    const { form } = this.props
    const ticketOptions = this.getTicketOptions()
    const selectedTicket = this.getSelectedTicket()

    return (
      <Row>
        <Col xs={24}>
          <Form.Item label="Cliente">
            {form.getFieldDecorator('customerId', {
              rules: [{ required: true }],
            })(<CustomerSelect onChange={this.storagePassengerName} />)}
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item
            label="Tipos de passagem"
            onChange={e => this.storagePassengerTicket(e.target.value)}
          >
            {form.getFieldDecorator('ticketPriceId', {
              initialValue: 0,
              rules: [{ required: false }],
            })(<Radio.Group options={ticketOptions} />)}
          </Form.Item>
        </Col>
        {selectedTicket && (
          <Col xs={24}>
            Valor: <b>R$ {selectedTicket.price || ''}</b>
          </Col>
        )}
      </Row>
    )
  }
}

const mapStateToProps = ({ excursionDetail, customerList }) => ({
  excursion: excursionDetail.payload,
  customers: customerList.payload,
})

const mapDispatchToProps = dispatch => ({
  storagePassenger: payload => dispatch({ type: passengerActions.SET_STATE, payload }),
})

export default connect(mapStateToProps, mapDispatchToProps)(PassengerChoice)
