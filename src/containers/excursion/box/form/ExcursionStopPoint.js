import React, { useCallback, useState } from 'react'
import { Button, Row, Col } from 'antd'
import StopAddress from './StopAddress'

const ExcursionStopPoint = (props) => {
  const [stopPoints, setStopPoints] = useState([])

  const addStopPoint = useCallback(() => {
    setStopPoints((stopPoints) => {
      const last = stopPoints.length ? stopPoints[stopPoints.length - 1] : 0
      return [...stopPoints, last + 1]
    })
  }, [])

  const removeStopPoint = useCallback((index) => {
    setStopPoints((stopPoints) => stopPoints.filter((x) => index !== x))
  }, [])

  const {
    form: { getFieldDecorator, getFieldValue },
  } = props
  getFieldDecorator('stopPointsKeys', { initialValue: stopPoints })
  const stopPointsKeys = getFieldValue('stopPointsKeys')

  return (
    <Row>
      <Col>
        {stopPointsKeys.map((x, index) => (
          <StopAddress
            key={index.toString()}
            index={x}
            removeStopPoint={removeStopPoint}
            {...props}
          />
        ))}
      </Col>
      <Col xs={{ span: 16, offset: 4 }} md={{ span: 8, offset: 8 }}>
        <Button block type="dashed" onClick={addStopPoint}>
          <i className="fa fa-plus mr-3" />
          Adicionar ponto de parada
        </Button>
      </Col>
    </Row>
  )
}
export default ExcursionStopPoint
