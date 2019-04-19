import React, { Component } from 'react'
import { Button, Icon, Row, Col } from 'antd'
import StopAddress from '../_partial/StopAddress'

class ExcursionStopPoint extends Component {
  constructor() {
    super()

    this.state = { stopPoints: [] }
  }

  addStopPoint = () => {
    const { stopPoints } = this.state
    stopPoints.push(stopPoints.length)
    this.setState({ stopPoints })
  }

  removeStopPoint = index => {
    console.log('index', index)
    let { stopPoints } = this.state
    console.log('stopPoints', stopPoints)
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
        <Col md={8} pull={8} push={8}>
          <Button type="dashed" onClick={this.addStopPoint}>
            <Icon type="plus" />
            Adicionar ponto de parada
          </Button>
        </Col>
      </Row>
    )
  }
}
export default ExcursionStopPoint
