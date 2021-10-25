import React, { useCallback, useEffect, useState } from 'react'
import { Row, Col, Button } from 'antd'
import Transport from './Transport'

const ExcursionTransport = ({ form, initialValues }) => {
  const [transports, setTransports] = useState(null)

  const addTransport = useCallback(() => {
    setTransports((transports) => {
      const last = transports.length ? transports[transports.length - 1]?.key : 0
      return [...transports, { key: last + 1 }]
    })
  }, [])

  // TODO: pop confirm do delete
  const removeTransport = useCallback((key) => {
    setTransports((transports) => transports.filter((x) => key !== x.key))
  }, [])

  useEffect(() => {
    if (!initialValues.id || !initialValues.transports) {
      setTransports([])
    } else {
      setTransports(initialValues.transports.map((x, i) => ({ ...x, key: i })))
    }
  }, [initialValues])

  return (
    <Row>
      <Col>
        {transports?.map((data, index) => (
          <Transport
            key={index}
            index={index}
            removeTransport={removeTransport}
            form={form}
            data={data}
          />
        ))}
      </Col>

      <Col xs={{ span: 16, offset: 4 }} md={{ span: 8, offset: 8 }}>
        <Button block type="dashed" onClick={addTransport}>
          <i className="fa fa-plus mr-3" />
          Adicionar transporte
        </Button>
      </Col>
    </Row>
  )
}

export default ExcursionTransport
