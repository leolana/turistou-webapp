import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Form, Radio } from 'antd'

import CustomerSelect from 'components/CustomerSelect/CustomerSelect'

const ticketPrices = [
  { id: 0, description: 'Normal', price: '320,00' },
  { id: 1, description: 'Estudante', price: '200,00' },
  { id: 2, description: 'Idoso', price: '189,90' },
]

class PassengerChoice extends Component {
  constructor(props) {
    super(props)
    this.state = { price: null }

    this.onChangeTicket = this.onChangeTicket.bind(this)
  }

  componentDidMount() {
    this.setState({ price: '320,00' })
  }

  onChangeTicket(event) {
    const id = event.target.value
    const selected = ticketPrices.find(x => x.id === id)
    if (selected) this.setState({ price: selected.price })
  }

  render() {
    const { form } = this.props
    const { price } = this.state
    const options = ticketPrices.map(x => ({ value: x.id, label: x.description }))

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
            {form.getFieldDecorator('ticketPriceId', { rules: [{ required: false }] })(
              <TicketSelect options={options} onChange={this.onChangeTicket} />,
            )}
          </Form.Item>
        </Col>
        <Col xs={24}>
          Valor: <b>R$ {price}</b>
        </Col>
      </Row>
    )
  }
}

const TicketSelect = ({ options, onChange }) => (
  <Radio.Group initialValue={null} options={options} onChange={onChange} />
)

const mapStateToProps = ({ excursionDetail }) => ({
  excursion: excursionDetail.payload,
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(PassengerChoice)
