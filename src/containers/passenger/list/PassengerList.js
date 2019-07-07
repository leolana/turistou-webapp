import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, Button, Tag, Modal, Input, Form, InputNumber, Row, Col } from 'antd'

import { tableData, statuses, statusesCode, statusesEnum } from 'mock/passengers'

class PassengerList extends Component {
  constructor() {
    super()
    this.filterData = this.filterData.bind(this)
    this.columnsForStatus = this.columnsForStatus.bind(this)

    const passengersList = tableData.map(x => {
      const paymentPercentual = x.paid / x.total
      if (paymentPercentual === 1) x.paidColor = 'text-success'
      else if (paymentPercentual > 0.5) x.paidColor = 'text-warning'
      else x.paidColor = 'text-danger'

      return x
    })
    this.state = { passengersList }
  }

  remove = id => {
    console.log('delete', id)
    // TODO: exclude...

    const { passengersList } = this.state
    const udPassengersList = passengersList.filter(x => x.id !== id)
    this.setState({ passengersList: udPassengersList })
  }

  handleRemove(id) {
    Modal.error({
      title: 'Removendo o passageiro da excursão',
      width: '60%',
      content: (
        <Row>
          <Col md={12}>
            <Form>
              <Form.Item label="Motivo da desistência">
                <Input size="default" maxLength={150} />
              </Form.Item>
              <Form.Item label="Valor devolvido">
                <InputNumber size="default" min={0} />
              </Form.Item>
            </Form>
          </Col>
          <Col md={12} className="pt-3 pl-5">
            <div>
              Valor pago: <span className="float-right font-weight-bold">R$ 1000,00</span>
            </div>
            <div>
              Valor devolvido:{' '}
              <span className="float-right font-weight-bold text-danger">R$ 400,00</span>
            </div>
            <div>
              Valor em caixa: <span className="float-right font-weight-bold">R$ 600,00</span>
            </div>
          </Col>
        </Row>
      ),
      okCancel: true,
      cancelText: 'Cancelar',
      okText: 'Excluir',
      okType: 'danger',
      onOk: () => this.remove(id),
    })
  }

  renderActionsButtons = (id, statusId) => {
    const actions = {
      booked: (
        <div className="table-action-buttons">
          <Link to={`${id}`}>
            <Button ghost size="small" type="primary" title="Atualizar pagamento">
              <i className="fa fa-dollar" />
            </Button>
          </Link>
          <Button ghost size="small" type="primary" title="Trocar passageiro">
            <i className="fa fa-exchange" />
          </Button>
          <Button
            ghost
            size="small"
            type="danger"
            title="Passageiro desistiu"
            onClick={() => this.handleRemove(id)}
          >
            <i className="fa fa-times" />
          </Button>
        </div>
      ),
      waiting: (
        <div className="table-action-buttons">
          <Button ghost size="small" type="primary" title="Reservar passageiro">
            <i className="fa fa-check" />
          </Button>
          <Button
            ghost
            size="small"
            type="danger"
            title="Remover passageiro"
            onClick={() => this.handleRemove(id)}
          >
            <i className="fa fa-times" />
          </Button>
        </div>
      ),
      canceled: (
        <div className="table-action-buttons">
          <Button ghost size="small" type="primary">
            <i className="fa fa-check" />
          </Button>
        </div>
      ),
    }
    return actions[statusesEnum[statusId]]
  }

  filterData() {
    const { statusId, query, startPay, fullPay } = this.props
    const { passengersList } = this.state
    let filteredData = passengersList

    if (statusId) filteredData = filteredData.filter(x => x.status === statusId)
    if (fullPay) filteredData = filteredData.filter(x => x.paid === x.total)
    else if (startPay) filteredData = filteredData.filter(x => x.paid > 0)
    if (query)
      filteredData = filteredData.filter(x => {
        const queryPart = query.toLowerCase().split(' ')
        return queryPart.every(q => x.customer.name.toLowerCase().includes(q))
      })

    return filteredData
  }

  columnsForStatus() {
    const { statusId } = this.props
    const allColumns = {
      actions: {
        dataIndex: 'id',
        key: 'id',
        render: id => this.renderActionsButtons(id, statusId),
      },
      status: {
        title: 'Situação',
        dataIndex: 'status',
        key: 'status',
        className: 'text-center',
        render: () => {
          const { description, type } = statuses.find(s => s.id === statusId)
          return <Tag className={`text-white bg-${type} mr-0`}>{description}</Tag>
        },
      },
      name: {
        title: 'Nome',
        dataIndex: 'customer.name',
        key: 'name',
      },
      telephone: {
        title: 'Telefone',
        dataIndex: 'customer.telephone',
        key: 'telephone',
      },
      reimbursedValue: {
        title: 'Valor devolvido',
        dataIndex: 'reimbursedValue',
        key: 'reimbursedValue',
        render: value => <span>R$ {value}</span>,
      },
      value: {
        title: 'Valor pago / Valor total',
        dataIndex: 'value',
        key: 'value',
        className: 'text-center',
        render: (_, row) => {
          if (row.status !== statusesCode.waiting)
            return (
              <span className={row.paidColor}>
                R$ {row.paid} / R$ {row.total}
              </span>
            )
          return ''
        },
      },
      nextTranche: {
        title: 'Próxima parcela',
        dataIndex: 'nextTranche',
        key: 'nextTranche',
        render: x => x && new Date(x).toLocaleDateString(),
      },
      lastTranche: {
        title: 'Última parcela',
        dataIndex: 'lastTranche',
        key: 'lastTranche',
        render: x => x && new Date(x).toLocaleDateString(),
      },
    }

    let columns = null
    switch (statusId) {
      case statusesCode.booked:
        columns = ['actions', 'name', 'value', 'nextTranche', 'lastTranche']
        break
      case statusesCode.waiting:
        columns = ['actions', 'name', 'telephone']
        break
      case statusesCode.canceled:
        columns = ['actions', 'name', 'reimbursedValue']
        break
      default:
        columns = ['status', 'name']
    }
    const tableColumns = columns.map(x => allColumns[x])
    return tableColumns
  }

  render() {
    const tableColumns = this.columnsForStatus()

    const filteredData = this.filterData()

    return (
      <Table
        rowKey="id"
        className="utils__scrollTable"
        scroll={{ x: '100%' }}
        columns={tableColumns}
        dataSource={filteredData}
        pagination={false}
      />
    )
  }
}

const mapStateToProps = state => {
  const { statusId, startPay, fullPay, query } = state.passenger
  return { statusId, startPay, fullPay, query }
}

export default connect(mapStateToProps)(PassengerList)
