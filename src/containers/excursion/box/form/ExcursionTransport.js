import React, { Component } from 'react'
import { Row, Col, Button, Icon } from 'antd'
import Transport from './Transport'

class ExcursionTransport extends Component {
  constructor() {
    super()
    this.state = { transports: [] }
  }

  addTransport = () => {
    const { transports } = this.state
    const last = transports.length ? transports[transports.length - 1] : -1
    transports.push(last + 1)
    this.setState({ transports })
  }

  removeTransport = index => {
    let { transports } = this.state
    transports = transports.filter(x => index !== x)
    this.setState({ transports })
  }

  render() {
    const { transports } = this.state

    return (
      <Row>
        <Col>
          {transports.map(x => (
            <Transport key={x} index={x} removeTransport={this.removeTransport} {...this.props} />
          ))}
        </Col>

        <Col md={8} pull={8} push={8}>
          <Button className="w-100" type="dashed" onClick={this.addTransport}>
            <Icon type="plus" />
            Adicionar transport
          </Button>
        </Col>
      </Row>
    )
  }
}
export default ExcursionTransport
