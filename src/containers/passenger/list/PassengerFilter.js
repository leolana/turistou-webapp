import React, { useCallback } from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { Form, Row, Col, Radio, Input } from 'antd'

const PassengerFilter = ({ setFilter }) => {
  const { excursionId } = useParams()

  // const { payload: passengers } = useSelector(state => state.passengerList)
  const { payload: excursion } = useSelector((state) => state.excursionDetail)

  const handleChangeFilter = useCallback(
    (field, value) => {
      setFilter((filter) => ({ ...filter, [field]: value }))
    },
    [setFilter],
  )

  return (
    <Form layout="inline" className="form-filter">
      <Row>
        <Col md={24}>
          <h5 hidden={excursion.id !== excursionId}>
            {excursion.destination}
            <small className="ml-2">
              <i className="fa fa-calendar-o" />{' '}
              {new Date(excursion.departureDate).toLocaleDateString()}
            </small>
            <small className="ml-2">
              <i className="fa fa-calendar-o" />{' '}
              {new Date(excursion.regressDate).toLocaleDateString()}
            </small>
          </h5>
        </Col>
        {/* <Col md={10}><Form.Item label="Excursão">{form.getFieldDecorator('excursion', { rules: [{ required: false }] })(<Select>{passengers.map(x => <Select.Option key={x.id} value={x.id}>{x.destination} <i className="fa fa-calendar ml-2" /> {new Date(x.departure).toLocaleDateString()}</Select.Option>)}</Select>)}</Form.Item></Col> */}
        <Col md={12}>
          <Radio.Group
            className="mb-1"
            onChange={(e) => handleChangeFilter('status', e.target.value)}
            defaultValue="BOOKED"
            buttonStyle="solid"
          >
            <Radio.Button value="BOOKED">Reservado</Radio.Button>
            <Radio.Button value="WAITING">Em espera</Radio.Button>
            <Radio.Button value="CANCELED">Desistente</Radio.Button>
          </Radio.Group>
        </Col>
        {/* TODO: Descomentar até achar um jeito melhor de acompanhar os filtros entre tabelas */}
        {/* <Col md={16}><Checkbox checked={startPay} onChange={handleChangeFilter('startPay', e.target.checked)}>Deram entrada</Checkbox><Checkbox checked={fullPay} onChange={handleChangeFilter('fullPay', e.target.checked)}>Pago 100%</Checkbox></Col> */}
        <Col md={12}>
          <Input
            onChange={(e) => handleChangeFilter('query', e.target.value)}
            addonBefore={<i className="fa fa-search" />}
            placeholder="Filtrar pelo nome"
          />
        </Col>
      </Row>
    </Form>
  )
}

export default PassengerFilter
