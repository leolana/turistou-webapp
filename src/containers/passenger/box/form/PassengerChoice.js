import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Form, Radio } from 'antd'

import CustomerSelect from 'components/CustomerSelect/CustomerSelect'

class PassengerChoice extends Component {
  getTicketOptions() {
    const {
      excursion: { ticketPrices, ticketPriceDefault },
    } = this.props
    const options = (ticketPrices || []).map(x => ({
      value: x.id,
      label: x.description,
      price: x.price,
    }))
    options.unshift({ value: null, label: 'Passagem normal', price: ticketPriceDefault })
    return options
  }

  getSelectedTicket(id) {
    if (id === undefined) {
      const { form } = this.props
      id = form.getFieldValue('ticketPriceId')
    }

    return this.getTicketOptions().filter(x => x.value === id)[0]
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
              rules: [{ required: false }],
            })(<CustomerSelect />)}
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item label="Tipos de passagem">
            {form.getFieldDecorator('ticketPriceId', {
              initialValue: null,
              rules: [{ required: false }],
            })(<Radio.Group options={ticketOptions} />)}
          </Form.Item>
        </Col>
        {selectedTicket && (
          <Col xs={24}>
            Valor: <b>R$ {(selectedTicket && selectedTicket.price) || ''}</b>
          </Col>
        )}
      </Row>
    )
  }
}

const mapStateToProps = ({ excursionDetail }) => ({
  excursion: excursionDetail.payload,
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(PassengerChoice)
