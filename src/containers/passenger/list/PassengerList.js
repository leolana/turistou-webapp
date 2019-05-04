import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, Button, Icon, Tag } from 'antd'

import { tableData, statuses, statusesCode } from 'mock/passengers'

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
  }

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

  filterData() {
    const { statusId, startPay, fullPay } = this.props
    let filteredData = passengersList

    if (statusId) filteredData = filteredData.filter(x => x.status === statusId)
    if (fullPay) filteredData = filteredData.filter(x => x.paid === x.total)
    else if (startPay) filteredData = filteredData.filter(x => x.paid > 0)

    return filteredData
  }

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
        filters: [
          { text: 'Reservados', value: 1 },
          { text: 'Em espera', value: 2 },
          { text: 'Desistentes', value: 3 },
        ],
        filterMultiple: false,
        onFilter: (value, record) => record.status === value,
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
    const filteredData = this.filterData()

    return (
      <div>
        <Table
          rowKey="id"
          className="utils__scrollTable"
          scroll={{ x: '100%' }}
          columns={tableColumns}
          dataSource={filteredData}
          pagination={false}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { statusId, startPay, fullPay } = state.passenger
  return { statusId, startPay, fullPay }
}

export default connect(mapStateToProps)(PassengerList)
