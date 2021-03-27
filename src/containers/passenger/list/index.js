import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Row, Button, Col, Dropdown, Menu } from 'antd'

import { fetchPassengers } from 'redux/passengerList/actions'
import { fetchPassengersToSwap } from 'redux/passengerToSwapList/actions'
import { getExcursionById } from 'redux/excursionDetail/actions'
import PassengerList from './PassengerList'
import PassengerFilter from './PassengerFilter'

const pageTitle = 'Lista de passageiros'

const menu = (
  <Menu>
    <Menu.Item>
      <Link to="./booked"> à excursão</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="./waiting"> à lista de espera</Link>
    </Menu.Item>
  </Menu>
)
const DropdownAdd = ({ placement }) => (
  <Dropdown overlay={menu} placement={placement || 'bottomRight'} className="float-right">
    <Button type="primary">
      Adicionar passageiro <i className="fa fa-bars ml-2" />
    </Button>
  </Dropdown>
)

const Passenger = () => {
  const dispatch = useDispatch()
  const { excursionId, id } = useParams()

  const [filter, setFilter] = useState({
    excursionId,
    query: '',
    status: 'BOOKED',
    startPay: false,
    fullPay: false,
  })

  useEffect(() => {
    dispatch(fetchPassengers(filter))
  }, [filter, dispatch])
  useEffect(() => {
    dispatch(fetchPassengersToSwap(excursionId))
  }, [excursionId, dispatch])
  useEffect(() => {
    dispatch(getExcursionById(excursionId))
  }, [excursionId, dispatch])

  return (
    <div>
      <Helmet title={pageTitle} />
      <div className="card">
        <div className="card-header">
          <Row>
            <Col xs={18}>
              <div className="utils__title">
                <strong>{pageTitle}</strong>
              </div>
            </Col>
            <Col xs={6}>
              <DropdownAdd />
            </Col>
          </Row>
        </div>
        <div className="card-body">
          <PassengerFilter setFilter={setFilter} />
          <PassengerList id={id} filter={filter} />

          <div className="form-actions">
            <DropdownAdd placement="topRight" />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Passenger
