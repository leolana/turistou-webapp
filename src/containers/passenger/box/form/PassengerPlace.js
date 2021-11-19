import React, { useCallback, useMemo } from 'react'
import { Row, Col, Form, Select } from 'antd'

import PassengerSummaryHeader from './_passengerResume'

const statusesEnum = {
  BOOKED: 'BOOKED',
  WAITING: 'WAITING',
  CANCELED: 'CANCELED',
}

const PassengerPlace = ({ form, excursion }) => {
  const vacancies = useMemo(() => {
    if (!excursion || !excursion.transports) return []
    const transportId = form.getFieldValue('transportId')
    const transport = excursion.transports.find(({ id }) => id === transportId)
    return transport ? getVacancies(excursion.passengers, transport) : []
  }, [excursion, form])

  const getStopPoints = useCallback(() => {
    const { stopPoints = [] } = excursion
    return stopPoints.map((x) => ({
      value: x.id,
      label: x.stopPoint,
    }))
  }, [excursion])

  const getTransports = useCallback(() => {
    const { transports = [] } = excursion
    // TODO: criar enum para type de transport se não tiver, e adicionar no label
    return transports.map((x) => ({
      value: x.id,
      label: `${x.type} ${x.plate} (${x.capacity})`,
    }))
  }, [excursion])

  return (
    <div>
      <PassengerSummaryHeader />

      <Row>
        <Col xs={24} sm={8} lg={6}>
          <Form.Item label="Transporte">
            {form.getFieldDecorator('transportId', {
              rules: [{ required: true, message: 'Por favor, selecione o transporte.' }],
            })(
              <Select>
                {getTransports().map((x) => (
                  <Select.Option key={x.value} value={x.value}>
                    {x.label}
                  </Select.Option>
                ))}
              </Select>,
            )}
          </Form.Item>
        </Col>
        <Col xs={24} sm={8} lg={6}>
          <Form.Item label="Escolha do assento">
            {form.getFieldDecorator('spot', {
              rules: [{ required: true, message: 'Por favor, selecione o assento.' }],
            })(
              <Select>
                {vacancies.map((x) => (
                  <Select.Option key={x.number} value={x.number} disabled={!x.free}>
                    Poltrona {x.number} {x.free ? '' : ' - Reservado'}
                  </Select.Option>
                ))}
              </Select>,
            )}
          </Form.Item>
        </Col>

        <Col xs={24} sm={16} lg={12}>
          <Form.Item label="Ponto de embarque">
            {form.getFieldDecorator('stopPointId', {
              rules: [{ required: true, message: 'Por favor, selecione o ponto de embarque.' }],
            })(
              <Select>
                {getStopPoints().map((x) => (
                  <Select.Option key={x.value} value={x.value}>
                    {x.label}
                  </Select.Option>
                ))}
              </Select>,
            )}
          </Form.Item>
        </Col>
      </Row>
    </div>
  )
}

const getVacancies = (passengers, transport) => {
  return Array(transport.capacity)
    .fill(null)
    .map((_, i) => {
      const number = i + 1
      const free = !passengers.some(
        (p) =>
          p.spot?.number === number &&
          p.spot?.transportId === transport.id &&
          p.status === statusesEnum.BOOKED,
      )

      return { number, free }
    })
}

export default PassengerPlace
