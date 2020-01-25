import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Row, Col, Radio, Input } from 'antd'

import passengerActions from 'redux/passengerList/actions'

@Form.create()
class PassengerFilter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      status: 'BOOKED',
    }

    this.handleChangeStartPay = this.handleChangeStartPay.bind(this)
    this.handleChangeFullPay = this.handleChangeFullPay.bind(this)
    this.handleChangeStatus = this.handleChangeStatus.bind(this)
    this.handleChangeFilter = this.handleChangeFilter.bind(this)
  }

  componentWillMount() {
    const { getPassengers, filter, id } = this.props
    const { status } = this.state
    const payload = { ...filter, status, excursionId: id }
    getPassengers(payload)
  }

  handleChangeStartPay(e) {
    const startPay = e.target.checked
    const { setFilter } = this.props
    setFilter({ startPay })
  }

  handleChangeFullPay(e) {
    const fullPay = e.target.checked
    const { setFilter } = this.props
    setFilter({ fullPay })
  }

  handleChangeStatus(e) {
    const status = e.target.value
    const { getPassengers, filter } = this.props
    const payload = { ...filter, status }
    getPassengers(payload)
    this.setState({ status })
  }

  handleChangeFilter(e) {
    const query = e.target.value
    const { setFilter } = this.props
    setFilter({ query })
  }

  render() {
    const { id, passengers } = this.props
    const { status } = this.state

    const excursion = passengers.find(x => x.id === id)

    return (
      <Form layout="inline" className="form-filter">
        <Row>
          <Col md={24}>
            {excursion && (
              <h5>
                {excursion.destination}
                <small className="ml-2">
                  <i className="fa fa-calendar-o" />{' '}
                  {new Date(excursion.departure).toLocaleDateString()}
                </small>
                <small className="ml-2">
                  <i className="fa fa-calendar-o" />{' '}
                  {new Date(excursion.regress).toLocaleDateString()}
                </small>
              </h5>
            )}
          </Col>
          {/*
          <Col md={10}>
            <Form.Item label="Excursão">
              {form.getFieldDecorator('excursion', { rules: [{ required: false }] })(
                <Select>
                  {passengers.map(x => <Select.Option key={x.id} value={x.id}>{x.destination} <i className="fa fa-calendar ml-2" /> {new Date(x.departure).toLocaleDateString()}</Select.Option>)}
                </Select>
              )}
            </Form.Item>
          </Col>
          */}
          <Col md={12}>
            <Radio.Group
              className="mb-1"
              onChange={this.handleChangeStatus}
              defaultValue="BOOKED"
              value={status}
              buttonStyle="solid"
            >
              <Radio.Button value="BOOKED">Reservado</Radio.Button>
              <Radio.Button value="WAITING">Em espera</Radio.Button>
              <Radio.Button value="CANCELED">Desistente</Radio.Button>
            </Radio.Group>
          </Col>
          {/* TODO: Descomentar até achar um jeito melhor de acompanhar os filtros entre tabelas */}
          {/* <Col md={16}>
            <Checkbox checked={startPay} onChange={this.handleChangeStartPay}>
              Deram entrada
            </Checkbox>
            <Checkbox checked={fullPay} onChange={this.handleChangeFullPay}>
              Pago 100%
            </Checkbox>
          </Col> */}
          <Col md={12}>
            <Input
              onChange={this.handleChangeFilter}
              addonBefore={<i className="fa fa-search" />}
              placeholder="Filtrar pelo nome"
            />
          </Col>
        </Row>
      </Form>
    )
  }
}

const mapStateToProps = ({ passengerList: { filter, payload: passengers } }) => ({
  filter,
  passengers,
})

const mapDispatchToProps = dispatch => ({
  setFilter: filter => dispatch({ type: passengerActions.SET_STATE, filter }),
  getPassengers: filter => dispatch({ type: passengerActions.GET_PASSENGERS, filter }),
})

export default connect(mapStateToProps, mapDispatchToProps)(PassengerFilter)
