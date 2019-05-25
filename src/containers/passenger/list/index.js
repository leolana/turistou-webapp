import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Row, Button, Col } from 'antd'

import PassengerList from './PassengerList'
import PassengerFilter from './PassengerFilter'

const pageTitle = 'Passageiros da excursão'

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
                <Button className="pull-right">
                  <Link to="./">Adicionar passageiro</Link>
                </Button>
              </Col>
            </Row>
          </div>
          <div className="card-body">
            <PassengerFilter id={id} />
            <PassengerList />

            <Button className="pull-right mt-3">
              <Link to="./">Adicionar passageiro</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }
}
export default Passenger
