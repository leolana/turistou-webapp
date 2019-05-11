import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from 'redux/excursion/actions'
import { Form, Radio, Input, Row, Col, Icon } from 'antd'

class ExcursionFilter extends Component {
  constructor() {
    super()

    this.handleChangeQuery = this.handleChangeQuery.bind(this)
    this.handleChangeStatus = this.handleChangeStatus.bind(this)
  }

  handleChangeQuery(e) {
    const query = e.target.value
    const { dispatch } = this.props
    dispatch({
      type: actions.SET_STATE,
      payload: { query },
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
    return (
      <Form layout="inline">
        <Row>
          <Col md={10}>
            <Radio.Group className="mb-1" onChange={this.handleChangeStatus}>
              <Radio.Button value={0}>Todas</Radio.Button>
              <Radio.Button value={1}>Atuais</Radio.Button>
              <Radio.Button value={2}>Concluídas</Radio.Button>
            </Radio.Group>
          </Col>
          <Col md={14}>
            <Input
              type="text"
              addonBefore={<Icon type="search" />}
              onChange={this.handleChangeQuery}
            />
          </Col>
        </Row>
      </Form>
    )
  }
}

const mapStateToProps = state => ({
  statusId: state.excursion.statusId,
  queryFilter: state.excursion.query,
})

export default connect(mapStateToProps)(ExcursionFilter)
