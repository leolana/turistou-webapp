import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button, Icon, Tag } from 'antd'

import { tableData, statuses, statusesCode } from 'mock/passengers'

const passengers = tableData.map(x => {
  const paymentPercentual = x.paid / x.total
  if (paymentPercentual === 1) x.paidColor = 'text-success'
  else if (paymentPercentual > 0.5) x.paidColor = 'text-warning'
  else x.paidColor = 'text-danger'

  return x
})

class PassengerList extends Component {
  renderActionsButtons = id => (
    <div className="table-action-buttons">
      <Link to={`${id}`}>
        <Button ghost size="small" type="primary">
          <Icon type="dollar" />
        </Button>
      </Link>
      <Button ghost size="small" type="primary">
        <Icon type="swap" />
      </Button>
      <Button ghost size="small" type="danger">
        <Icon type="user-delete" />
      </Button>
    </div>
  )

  render() {
    const tableColumns = [
      {
        dataIndex: 'id',
        key: 'id',
        render: this.renderActionsButtons,
      },
      {
        title: 'Situação',
        dataIndex: 'status',
        key: 'status',
        className: 'text-center',
        render: statusId => {
          const { description, type } = statuses.find(s => s.id === statusId)
          return <Tag className={`text-white bg-${type} mr-0`}>{description}</Tag>
        },
      },
      {
        title: 'Nome',
        dataIndex: 'name',
        key: 'name',
      },
      {
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
      {
        title: 'Próxima parcela',
        dataIndex: 'nextTranche',
        key: 'nextTranche',
        render: x => x && new Date(x).toLocaleDateString(),
      },
      {
        title: 'Última parcela',
        dataIndex: 'lastTranche',
        key: 'lastTranche',
        render: x => x && new Date(x).toLocaleDateString(),
      },
    ]

    return (
      <Table
        rowKey="id"
        className="utils__scrollTable"
        scroll={{ x: '100%' }}
        columns={tableColumns}
        dataSource={passengers}
        pagination={false}
      />
    )
  }
}
export default PassengerList
