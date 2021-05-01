import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useQuery } from '@apollo/react-hooks'
import { Row, Button, Col, Dropdown, Menu } from 'antd'

import { fetchCustomers } from 'redux/customerList/actions'
import { FETCH_PASSENGERS, setPassengerListState } from 'redux/passengerList/actions'
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

  const {
    loading,
    data: { passengers = [] } = {},
    refetch: getPassengers,
  } = useQuery(FETCH_PASSENGERS, { variables: { filter } })

  useEffect(() => {
    getPassengers()
  }, [getPassengers])

  useEffect(() => {
    dispatch(
      setPassengerListState({
        payload: passengers,
        isLoading: loading,
      }),
    )
  }, [dispatch, loading, passengers])

  useEffect(() => {
    dispatch(fetchCustomers())
  }, [dispatch])

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
