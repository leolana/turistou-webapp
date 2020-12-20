import React, { useCallback, useEffect, useState } from 'react'
import { Button, Row, Col } from 'antd'
import StopAddress from './StopAddress'

const ExcursionStopPoint = ({ form, initialValues }) => {
  const [stopPoints, setStopPoints] = useState(null)

  const addStopPoint = useCallback(() => {
    setStopPoints((stopPoints) => {
      const last = stopPoints.length ? stopPoints[stopPoints.length - 1].key : 0
      return [...stopPoints, { key: last + 1, stopPoint: '' }]
    })
  }, [])

  // TODO: pop confirm do delete
  const removeStopPoint = useCallback((key) => {
    setStopPoints((stopPoints) => stopPoints.filter((x) => key !== x.key))
  }, [])

  useEffect(() => {
    if (!initialValues.id) {
      setStopPoints([])
    } else if (stopPoints === null) {
      setStopPoints(initialValues.stopPoints.map((x, i) => ({ ...x, key: i })))
    }
  }, [initialValues, stopPoints])

  return (
    <Row>
      <Col>
        {stopPoints?.map((data) => (
          <StopAddress key={data.key} removeStopPoint={removeStopPoint} form={form} data={data} />
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
