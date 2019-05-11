import React, { Component } from 'react'
import { Button, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
// import Authorize from 'components/LayoutComponents/Authorize'
import { Helmet } from 'react-helmet'

import 'costom.scss'

import ExcursionFilter from './ExcursionFilter'
import ExcursionList from './ExcursionList'

const pageTitle = 'Próximas excursões'

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
                    <Button className="pull-right">
                      <Link to="./">Adicionar nova excursão</Link>
                    </Button>
                  </Col>
                </Row>
              </div>
              <div className="card-body">
                <ExcursionFilter />
                <ExcursionList />

                <Button className="pull-right mt-3">
                  <Link to="./">Adicionar nova excursão</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Excursion
