import React, { Component } from 'react'
import { Table, Button, Icon } from 'antd'
// import Authorize from 'components/LayoutComponents/Authorize'
import { Helmet } from 'react-helmet'

import './index.scss'

import { tableData as mockData } from './data.json'

class ExcursionList extends Component {
  constructor() {
    super()
    const tableData = mockData.map(x => {
      if (!x.vacacy) {
        x.vacacy = 'Sem vagas'
        x.textStyle = 'font-italic'
      } else if (x.vacacy / x.capacity > 0.75) x.textStyle = 'text-danger'
      else if (x.vacacy / x.capacity > 0.33) x.textStyle = 'text-warning'
      else x.textStyle = 'text-success'

      return x
    })
    this.state = { tableData }
  }

  renderActionsButtons = () => (
    <div className="table-action-buttons">
      <Button ghost size="small" type="primary">
        <Icon type="user-add" />
      </Button>
      <Button ghost size="small" type="primary">
        <Icon type="user" />
      </Button>
      <Button ghost size="small" type="primary">
        <Icon type="edit" />
      </Button>
      <Button ghost size="small" type="danger">
        <Icon type="delete" />
      </Button>
    </div>
  )

  render() {
    const { tableData } = this.state

    const tableColumns = [
      {
        dataIndex: 'action',
        key: 'id',
        render: this.renderActionsButtons,
      },
      {
        title: 'Vagas',
        dataIndex: 'vacacy',
        key: 'vacacy',
        render: (x, a) => <span className={a.textStyle}>{x}</span>,
      },
      {
        title: 'Capacidade',
        dataIndex: 'capacity',
        key: 'capacity',
      },
      {
        title: 'Destino',
        dataIndex: 'destination',
        key: 'destination',
      },
      {
        title: 'Partida',
        dataIndex: 'departure',
        key: 'departure',
        sorter: (a, b) => a.age - b.age,
        render: x => new Date(x).toLocaleString(),
      },
      {
        title: 'Retorno',
        dataIndex: 'regress',
        key: 'regress',
        render: x => new Date(x).toLocaleString(),
      },
    ]

    return (
      <div>
        <Helmet title="Excursões" />
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <div className="utils__title">
                  <strong>Próximas excursões</strong>
                </div>
                {/* <div className="utils__titleDescription">
                  Block with important Recently Referrals information
                </div> */}
              </div>
              <div className="card-body">
                <Table
                  className="utils__scrollTable"
                  scroll={{ x: '100%' }}
                  columns={tableColumns}
                  dataSource={tableData}
                  pagination={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ExcursionList
