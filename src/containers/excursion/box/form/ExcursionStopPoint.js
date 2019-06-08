import React, { Component } from 'react'
import { Button, Icon, Row, Col } from 'antd'
import StopAddress from './StopAddress'

class ExcursionStopPoint extends Component {
  constructor() {
    super()

    this.state = { stopPoints: [] }
  }

  addStopPoint = () => {
    const { stopPoints } = this.state
    const last = stopPoints.length ? stopPoints[stopPoints.length - 1] : 0
    stopPoints.push(last + 1)
    this.setState({ stopPoints })
  }

  removeStopPoint = index => {
    let { stopPoints } = this.state
    stopPoints = stopPoints.filter(x => index !== x)
    this.setState({ stopPoints })
  }

  render() {
    const { stopPoints } = this.state

    return (
      <Row>
        <Col>
          {stopPoints.map(x => (
            <StopAddress key={x} index={x} removeStopPoint={this.removeStopPoint} {...this.props} />
          ))}
        </Col>
        <Col xs={{ span: 16, offset: 4 }} md={{ span: 8, offset: 8 }}>
          <Button block type="dashed" onClick={this.addStopPoint}>
            <Icon type="plus" />
            Adicionar ponto de parada
          </Button>
        </Col>
      </Row>
    )
  }
}
export default ExcursionStopPoint
