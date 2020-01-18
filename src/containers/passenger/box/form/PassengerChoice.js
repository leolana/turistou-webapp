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
    options.unshift({ value: 0, label: 'Passagem normal', price: ticketPriceDefault })
    return options
  }

  render() {
    const { form } = this.props
    const ticketOptions = this.getTicketOptions()
    const selectedTicket = ticketOptions.filter(
      x => x.value === form.getFieldValue('ticketPriceId'),
    )[0]

    return (
      <Row>
        <Col xs={24}>
          <Form.Item label="Cliente">
            {form.getFieldDecorator('customer', {
              rules: [{ required: false }],
            })(<CustomerSelect />)}
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item label="Tipos de passagem">
            {form.getFieldDecorator('ticketPriceId', {
              initialValue: 0,
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
