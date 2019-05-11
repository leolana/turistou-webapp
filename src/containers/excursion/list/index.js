import React, { Component } from 'react'
import { Table, Button, Icon, Row, Col, Modal } from 'antd'
import { Link } from 'react-router-dom'
// import Authorize from 'components/LayoutComponents/Authorize'
import { Helmet } from 'react-helmet'

import 'costom.scss'

import { tableData as mockData } from 'mock/excursions'
import ExcursionFilter from './ExcursionFilter'

const pageTitle = 'Próximas excursões'

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

  delete = id => {
    console.log('delete', id)
    // TODO: exclude...
  }

  handleDelete(id) {
    Modal.error({
      title: 'Deseja excluir esta excursão?',
      content: 'Esta ação não podera ser desfeita',
      okText: 'Sim',
      okType: 'danger',
      onOk: () => this.delete(id),
      okCancel: true,
      cancelText: 'Não',
    })
  }

  renderActionsButtons = id => (
    <div className="table-action-buttons">
      <Link to={`${id}/passenger`}>
        <Button ghost size="small" type="primary" title="Adicionar passageiro">
          <Icon type="user-add" />
        </Button>
      </Link>
      <Link to={`${id}/passenger/list`}>
        <Button ghost size="small" type="primary" title="Lista de passageiros">
          <Icon type="usergroup-add" />
        </Button>
      </Link>
      <Button ghost size="small" type="primary">
        <Icon type="edit" />
      </Button>
      <Button ghost size="small" type="danger" onClick={() => this.handleDelete(id)}>
        <Icon type="delete" />
      </Button>
    </div>
  )

  render() {
    const { tableData } = this.state

    const tableColumns = [
      {
        dataIndex: 'id',
        key: 'id',
        render: this.renderActionsButtons,
      },
      {
        title: 'Vagas',
        dataIndex: 'vacacy',
        key: 'vacacy',
        render: (x, a) => (
          <span className={a.textStyle}>
            {x} / {a.capacity}
          </span>
        ),
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
        render: x => new Date(x).toLocaleDateString(),
      },
      {
        title: 'Retorno',
        dataIndex: 'regress',
        key: 'regress',
        render: x => new Date(x).toLocaleDateString(),
      },
    ]

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

                <Table
                  rowKey="id"
                  className="utils__scrollTable"
                  scroll={{ x: '100%' }}
                  columns={tableColumns}
                  dataSource={tableData}
                  pagination={false}
                />

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

export default ExcursionList
