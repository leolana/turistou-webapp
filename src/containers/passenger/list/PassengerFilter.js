import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Row, Col, Checkbox, Icon, Radio } from 'antd'
import actions from 'redux/passenger/actions'

import { tableData } from 'mock/excursions'

@Form.create()
class PassengerFilter extends Component {
  constructor(props) {
    super(props)

    this.handleChangeStartPay = this.handleChangeStartPay.bind(this)
    this.handleChangeFullPay = this.handleChangeFullPay.bind(this)
    this.handleChangeStatus = this.handleChangeStatus.bind(this)
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

  render() {
    const { id, startPay, fullPay, statusId } = this.props
    const excursion = tableData.filter(x => x.id === +id)[0]

    return (
      <Form layout="inline">
        <Row>
          <Col md={24}>
            <h5>
              {excursion.destination}
              <small className="ml-2">
                <Icon type="calendar" /> {new Date(excursion.departure).toLocaleDateString()}
              </small>
            </h5>
          </Col>
          {/* 
          <Col md={10}>
            <Form.Item label="Excursão">
              {form.getFieldDecorator('excursion', { rules: [{ required: false }] })(
                <Select>
                  {tableData.map(x => <Select.Option key={x.id} value={x.id}>{x.destination} <Icon type="calendar" className="ml-2" /> {new Date(x.departure).toLocaleDateString()}</Select.Option>)}
                </Select>
              )}
            </Form.Item>
          </Col>
          */}
          <Col md={8}>
            <Radio.Group
              className="mb-1"
              onChange={this.handleChangeStatus}
              defaultValue={statusId || 1}
            >
              <Radio.Button value={1}>Reservado</Radio.Button>
              <Radio.Button value={2}>Em espera</Radio.Button>
              <Radio.Button value={3}>Desistente</Radio.Button>
            </Radio.Group>
          </Col>
          <Col md={16}>
            <Checkbox checked={startPay} onChange={this.handleChangeStartPay}>
              Exibir somente que deram entrada
            </Checkbox>
            <Checkbox checked={fullPay} onChange={this.handleChangeFullPay}>
              Exibir somente que pagaram 100%
            </Checkbox>
          </Col>
        </Row>
      </Form>
    )
  }
}

const mapStateToProps = state => {
  const { statusId, startPay, fullPay } = state.passenger
  return { statusId, startPay, fullPay }
}

export default connect(mapStateToProps)(PassengerFilter)
