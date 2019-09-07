import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from 'redux/passenger/actions'
import { Form, Row, Col, Radio, Input } from 'antd'

import { tableData } from 'mock/excursions'

@Form.create()
class PassengerFilter extends Component {
  constructor(props) {
    super(props)

    this.handleChangeStartPay = this.handleChangeStartPay.bind(this)
    this.handleChangeFullPay = this.handleChangeFullPay.bind(this)
    this.handleChangeStatus = this.handleChangeStatus.bind(this)
    this.handleChangeFilter = this.handleChangeFilter.bind(this)
  }

  handleChangeStartPay(e) {
    const startPay = e.target.checked
    const { dispatch } = this.props
    dispatch({
      type: actions.SET_STATE,
      payload: { startPay },
    })
  }

  handleChangeFullPay(e) {
    const fullPay = e.target.checked
    const { dispatch } = this.props
    dispatch({
      type: actions.SET_STATE,
      payload: { fullPay },
    })
  }

  handleChangeStatus(e) {
    const statusId = e.target.value
    const { dispatch } = this.props
    dispatch({
      type: actions.SET_STATE,
      payload: { statusId },
    })
  }

  handleChangeFilter(e) {
    const query = e.target.value
    const { dispatch } = this.props
    dispatch({
      type: actions.SET_STATE,
      payload: { query },
    })
  }

  render() {
    // const { id, startPay, fullPay, statusId } = this.props
    const { id, statusId } = this.props
    const excursion = tableData.filter(x => x.id === +id)[0]

    return (
      <Form layout="inline" className="form-filter">
        <Row>
          <Col md={24}>
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
          </Col>
          {/* 
          <Col md={10}>
            <Form.Item label="Excursão">
              {form.getFieldDecorator('excursion', { rules: [{ required: false }] })(
                <Select>
                  {tableData.map(x => <Select.Option key={x.id} value={x.id}>{x.destination} <i className="fa fa-calendar ml-2" /> {new Date(x.departure).toLocaleDateString()}</Select.Option>)}
                </Select>
              )}
            </Form.Item>
          </Col>
          */}
          <Col md={12}>
            <Radio.Group
              className="mb-1"
              onChange={this.handleChangeStatus}
              defaultValue={statusId || 1}
              buttonStyle="solid"
            >
              <Radio.Button value={1}>Reservado</Radio.Button>
              <Radio.Button value={2}>Em espera</Radio.Button>
              <Radio.Button value={3}>Desistente</Radio.Button>
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

export default connect()(PassengerFilter)
