import React from 'react'
import { Button, Row, Col, Card } from 'antd'
import { Link } from 'react-router-dom'
// import Authorize from 'components/LayoutComponents/Authorize'
import { Helmet } from 'react-helmet'

import 'costom.scss'
import CustomerList from './CustomerList'
import CustomerFilter from './CustomerFilter'

const pageTitle = 'Clientes'

const ButtonAdd = () => (
  <Button type="primary" className="float-right">
    <Link to="./">Adicionar novo cliente</Link>
  </Button>
)

const Customer = () => {
  return (
    <>
      <Helmet title={pageTitle} />
      <Card>
        <Row>
          <Col xs={18}>
            <div className="utils__title">
              <strong>{pageTitle}</strong>
            </div>
          </Col>
          <Col xs={6}>
            <ButtonAdd />
          </Col>
        </Row>
        <>
          <CustomerFilter />
          <CustomerList />

          <div className="form-actions">
            <ButtonAdd />
          </div>
        </>
      </Card>
    </>
  )
}

export default Customer
