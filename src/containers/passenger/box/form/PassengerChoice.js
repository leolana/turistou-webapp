import React, { useCallback, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Form, Radio } from 'antd'

import passengerActions from 'redux/passengerDetail/actions'
import CustomerSelect from 'components/CustomerSelect/CustomerSelect'

const PassengerChoice = ({ form, excursion }) => {
  const dispatch = useDispatch()
  const { payload: customers } = useSelector((state) => state.customerList)

  const storagePassenger = useCallback(
    (payload) => dispatch({ type: passengerActions.SET_STATE, payload }),
    [dispatch],
  )
  const storagePassengerName = useCallback(
    (customerId) => {
      const customer = customers.find((x) => x.id === customerId) || {}
      storagePassenger({ customerName: customer.name || 'Alguém' })
    },
    [customers, storagePassenger],
  )

  const storagePassengerTicket = useCallback(
    (ticketPriceId) => {
      const { ticketPrices, ticketPriceDefault } = excursion

      const ticket = ticketPrices?.find((x) => x.id === ticketPriceId) || {
        description: 'Normal',
        price: ticketPriceDefault,
      }

      storagePassenger({ ticket })
      return ticket
    },
    [excursion, storagePassenger],
  )

  const ticketOptions = useMemo(() => {
    const { ticketPrices, ticketPriceDefault } = excursion
    const options = (ticketPrices || []).map((x) => ({
      value: x.id,
      label: x.description,
      price: x.price,
    }))
    options.unshift({ value: '0', label: 'Passagem normal', price: ticketPriceDefault })
    return options
  }, [excursion])

  const selectedTicket = useMemo(() => {
    const id = form.getFieldValue('ticketPriceId')
    storagePassengerTicket(id)
    return id ? ticketOptions.find((x) => x.value === id) : ticketOptions[0]
  }, [ticketOptions, form, storagePassengerTicket])

  return (
    <Row>
      <Col xs={24}>
        <Form.Item label="Cliente">
          {form.getFieldDecorator('customerId', {
            rules: [{ required: true, message: 'Por favor, selecione o cliente.' }],
          })(<CustomerSelect onChange={storagePassengerName} />)}
        </Form.Item>
      </Col>
      <Col xs={24}>
        <Form.Item
          label="Tipos de passagem"
          onChange={(e) => storagePassengerTicket(e.target.value)}
        >
          {form.getFieldDecorator('ticketPriceId', {
            initialValue: '0',
            rules: [{ required: false }],
          })(<Radio.Group options={ticketOptions} />)}
        </Form.Item>
      </Col>
      {selectedTicket && (
        <Col xs={24}>
          Valor: <b>R$ {selectedTicket.price || ''}</b>
        </Col>
      )}
    </Row>
  )
}
export default PassengerChoice
