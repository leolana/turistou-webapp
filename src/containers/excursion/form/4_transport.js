import React, { Component } from 'react'
import { Row, Col, Button, Icon } from 'antd'
import Transport from '../_partial/Transport'

class ExcursionTransport extends Component {
  render() {
    return (
      <Row>
        {/* TODO: add transport */}
        <Col>
          <Button type="dashed" onClick={this.onClickPlusTransport} className="float-right">
            <Icon type="plus" />
          </Button>
        </Col>
        <Transport {...this.props} />
      </Row>
    )
  }
}
export default ExcursionTransport
