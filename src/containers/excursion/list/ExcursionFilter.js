import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from 'redux/excursion/actions'
import { Form, Radio, Input, Row, Col, Icon } from 'antd'

import { EXCURSION_STATUS, EXCURSION_STATUS_ENUM } from 'constants/excursionStatus'

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
      type: actions.GET_EXCURSIONS,
      payload: { query },
    })
  }

  handleChangeStatus(e) {
    const statusId = e.target.value
    const { dispatch } = this.props
    dispatch({
      type: actions.GET_EXCURSIONS,
      payload: { statusId },
    })
  }

  render() {
    return (
      <Form layout="inline">
        <Row>
          <Col md={12}>
            <Radio.Group
              className="mb-1"
              onChange={this.handleChangeStatus}
              buttonStyle="solid"
              defaultValue={EXCURSION_STATUS_ENUM.nexties}
            >
              {EXCURSION_STATUS.map(x => (
                <Radio.Button key={x.id} value={x.id}>
                  {x.description}
                </Radio.Button>
              ))}
            </Radio.Group>
          </Col>
          <Col md={12}>
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
