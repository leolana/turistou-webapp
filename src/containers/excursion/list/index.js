import React, { useState } from 'react'
import { Button, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
// import Authorize from 'components/LayoutComponents/Authorize'
import { Helmet } from 'react-helmet'

import 'costom.scss'

import { EXCURSION_STATUS_ENUM } from 'constants/excursionStatus'
import ExcursionFilter from './ExcursionFilter'
import ExcursionList from './ExcursionList'

const pageTitle = 'Excursões'

const ButtonAdd = () => (
  <Button type="primary" className="float-right">
    <Link to="./">Adicionar nova excursão</Link>
  </Button>
)

const defaultFilter = {
  statusId: EXCURSION_STATUS_ENUM.next,
  query: '',
}

const Excursion = () => {
  const [filter, setFilter] = useState(defaultFilter)

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
              <ExcursionFilter defaultFilter={defaultFilter} setFilter={setFilter} />
              <ExcursionList filter={filter} />

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
export default Excursion
