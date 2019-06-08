import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, Button, Icon, Tag, Modal } from 'antd'

import { tableData, statuses, statusesCode, statusesEnum } from 'mock/passengers'

const passengersList = tableData.map(x => {
  const paymentPercentual = x.paid / x.total
  if (paymentPercentual === 1) x.paidColor = 'text-success'
  else if (paymentPercentual > 0.5) x.paidColor = 'text-warning'
  else x.paidColor = 'text-danger'

  return x
})

class PassengerList extends Component {
  constructor() {
    super()
    this.filterData = this.filterData.bind(this)
    this.columnsForStatus = this.columnsForStatus.bind(this)
  }

  remove = id => {
    console.log('delete', id)
    // TODO: exclude...
  }

  handleRemove(id) {
    Modal.error({
      title: 'Passageiro desistiu da excursão?',
      content: 'Esta ação colocará o passageiro na lista de desistência',
      okText: 'Sim',
      okType: 'danger',
      onOk: () => this.remove(id),
      okCancel: true,
      cancelText: 'Não',
    })
  }

  renderActionsButtons = (id, statusId) => {
    const actions = {
      booked: (
        <div className="table-action-buttons">
          <Link to={`${id}`}>
            <Button ghost size="small" type="primary" title="Atualizar pagamento">
              <Icon type="dollar" />
            </Button>
          </Link>
          <Button ghost size="small" type="primary" title="Trocar passageiro">
            <Icon type="swap" />
          </Button>
          <Button
            ghost
            size="small"
            type="danger"
            title="Passageiro desistiu"
            onClick={() => this.handleRemove(id)}
          >
            <Icon type="close" />
          </Button>
        </div>
      ),
      waiting: (
        <div className="table-action-buttons">
          <Button ghost size="small" type="primary" title="Reservar passageiro">
            <Icon type="check" />
          </Button>
          <Button
            ghost
            size="small"
            type="danger"
            title="Remover passageiro"
            onClick={() => this.handleRemove(id)}
          >
            <Icon type="close" />
          </Button>
        </div>
      ),
      canceled: (
        <div className="table-action-buttons">
          <Button ghost size="small" type="primary">
            <Icon type="check" />
          </Button>
        </div>
      ),
    }
    return actions[statusesEnum[statusId]]
  }

  filterData() {
    const { statusId, query, startPay, fullPay } = this.props
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
      outstandingBalance: {
        title: 'Saldo em aberto',
        dataIndex: 'outstandingBalance',
        key: 'outstandingBalance',
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
        columns = ['actions', 'name', 'outstandingBalance']
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
