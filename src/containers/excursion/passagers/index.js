import React, { Component } from 'react'
import { Button, Icon, Table } from 'antd'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { tableData } from 'mock/customers'
import ExcursionAddPassagers from './ExcursionPassagers'

import 'costom.scss'

const pageTitle = 'Passageiros'

class ExcursionPassagers extends Component {
  renderActionsButtonsPassagers = id => (
    <div className="table-action-buttons">
      <Link to={`excursion/${id}/passagers`}>
        <Button ghost size="small" type="primary">
          <Icon type="user-add" />
        </Button>
      </Link>
      <Button ghost size="small" type="danger">
        <Icon type="delete" />
      </Button>
    </div>
  )

  renderActionsButtonsWaiting = id => (
    <div className="table-action-buttons">
      <Link to={`excursion/${id}/passagers`}>
        <Button ghost size="small" type="primary">
          <Icon type="user-add" />
        </Button>
      </Link>
      <Button ghost size="small" type="danger">
        <Icon type="delete" />
      </Button>
    </div>
  )

  renderActionsButtonsWaiver = id => (
    <div className="table-action-buttons">
      <Link to={`excursion/${id}/passagers`}>
        <Button ghost size="small" type="primary">
          <Icon type="user-add" />
        </Button>
      </Link>
      <Button ghost size="small" type="danger">
        <Icon type="delete" />
      </Button>
    </div>
  )

  render() {
    const passagerTableColumns = [
      {
        dataIndex: 'id',
        key: 'id',
        render: this.renderActionsButtonsPassagers,
      },
      {
        title: 'Nome',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'RG',
        dataIndex: 'rg',
        key: 'rg',
      },
      {
        title: 'Telefone',
        dataIndex: 'telephone',
        key: 'telephone',
      },
      {
        title: 'Cidade',
        dataIndex: 'city',
        key: 'city',
      },
    ]

    return (
      <div>
        <Helmet title={pageTitle} />
        <div className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>{pageTitle}</strong>
            </div>
          </div>
          <div className="card-body">
            <ExcursionAddPassagers {...this.props} />
            <Table
              className="utils__scrollTable mt-3"
              scroll={{ x: '100%' }}
              columns={passagerTableColumns}
              dataSource={tableData}
              pagination={false}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default ExcursionPassagers
