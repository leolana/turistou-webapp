import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from 'redux/excursionList/actions'
import { Form, Radio, Input, Row, Col } from 'antd'

import { EXCURSION_STATUS, EXCURSION_STATUS_ENUM } from 'constants/excursionStatus'

class ExcursionFilter extends Component {
  constructor() {
    super()

    this.handleChangeFilterProperty = this.handleChangeFilterProperty.bind(this)
  }

  handleChangeFilterProperty(property, value) {
    const { filter, setFilter } = this.props
    const newFilter = { ...filter, [property]: value }
    setFilter(newFilter)
  }

  render() {
    return (
      <Form layout="inline" className="mb-1">
        <Row>
          <Col md={12}>
            <Radio.Group
              onChange={e => this.handleChangeFilterProperty('statusId', e.target.value)}
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
              addonBefore={<i className="fa fa-search" />}
              onChange={e => this.handleChangeFilterProperty('query', e.target.value)}
            />
          </Col>
        </Row>
      </Form>
    )
  }
}

const mapStateToProps = ({ excursionList: { filter } }) => ({
  filter,
})

const mapDispatchToProps = dispatch => ({
  setFilter: filter => dispatch({ type: actions.SET_STATE, filter }),
})

export default connect(mapStateToProps, mapDispatchToProps)(ExcursionFilter)
