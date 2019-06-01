import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Row, Button, Col, Dropdown, Menu, Icon } from 'antd'

import PassengerList from './PassengerList'
import PassengerFilter from './PassengerFilter'

const pageTitle = 'Passageiros da excursão'

const menu = (
  <Menu>
    <Menu.Item>
      <Link to="./">na excursão</Link>
    </Menu.Item>
    <Menu.Item> à lista de espera </Menu.Item>
  </Menu>
)
const DropdownAdd = ({ placement }) => (
  <Dropdown overlay={menu} placement={placement || 'bottomRight'} className="float-right">
    <Button type="primary">
      Adicionar passageiro <Icon type="ellipsis" rotate={90} />
    </Button>
  </Dropdown>
)

class Passenger extends Component {
  render() {
    const { match } = this.props
    const { id } = match.params

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
            <PassengerFilter id={id} />
            <PassengerList />

            <div className="form-actions">
              <DropdownAdd placement="topRight" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Passenger
