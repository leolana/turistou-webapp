import React, { Component } from 'react'
import { Row, Col } from 'antd'

class PassagerPayment extends Component {
  render() {
    // const { form } = this.props;

    return (
      <div>
        <Row>
          <Col md={12}>
            <b>Passageiro: </b>
            <span>Fulano da Silva</span>
          </Col>
          <Col md={12}>
            <b>Tipo de passagem: </b>
            <span>Normal</span>
          </Col>
        </Row>
      </div>
    )
  }
}

export default PassagerPayment
