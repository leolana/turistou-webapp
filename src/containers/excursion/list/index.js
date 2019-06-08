import React, { Component } from 'react'
import { Button, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
// import Authorize from 'components/LayoutComponents/Authorize'
import { Helmet } from 'react-helmet'

import 'costom.scss'

import ExcursionFilter from './ExcursionFilter'
import ExcursionList from './ExcursionList'

const pageTitle = 'Excursões'

const ButtonAdd = () => (
  <Button type="primary" className="float-right">
    <Link to="./">Adicionar nova excursão</Link>
  </Button>
)

class Excursion extends Component {
  render() {
    return (
      <div>
        <Helmet title={pageTitle} />
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
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
              </div>
              <div className="card-body">
                <ExcursionFilter />
                <ExcursionList />

                <div className="form-actions">
                  <ButtonAdd />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Excursion
