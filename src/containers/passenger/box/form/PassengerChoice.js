import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Form, Radio } from 'antd'

import CustomerSelect from 'components/CustomerSelect/CustomerSelect'

const passagePrices = [
  { id: 0, description: 'Normal', price: '320,00' },
  { id: 1, description: 'Estudante', price: '200,00' },
  { id: 2, description: 'Idoso', price: '189,90' },
]

class PassengerChoice extends Component {
  constructor(props) {
    super(props)
    this.state = { price: null }
    this.onChangePassage = this.onChangePassage.bind(this)
  }

  componentDidMount() {
    this.setState({ price: '320,00' })
  }

  onChangePassage(event) {
    const id = event.target.value
    const selected = passagePrices.find(x => x.id === id)
    if (selected) this.setState({ price: selected.price })
  }

  render() {
    const { form } = this.props
    const { price } = this.state
    const options = passagePrices.map(x => ({ value: x.id, label: x.description }))

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
              <TicketSelect options={options} onChange={this.onChangePassage} />,
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

const mapStateToProps = ({ excursionDetail }) => ({
  excursion: excursionDetail.payload,
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(PassengerChoice)

const TicketSelect = ({ options, onChange }) => (
  <Radio.Group size="default" initialValue={null} options={options} onChange={onChange} />
)
