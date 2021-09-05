import React from 'react'
import { useSelector } from 'react-redux'
import { Col, Row } from 'antd'

const PassengerSummaryHeader = () => {
  const { customerName, ticket } = useSelector((state) => state.passengerDetail)

  return (
    <Row className="mb-5">
      <Col xs={24} md={12}>
        <b>Passageiro: </b>
        <span>{customerName}</span>
      </Col>
      <Col xs={24} md={12}>
        <b>Tipo de passagem: </b>
        {ticket && `${ticket.description}(R$ ${ticket.price})`}
      </Col>
    </Row>
  )
}

export default PassengerSummaryHeader
