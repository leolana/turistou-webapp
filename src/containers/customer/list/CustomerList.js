import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, Button } from 'antd'

import { tableData } from 'mock/customers'

class CustomerList extends Component {
  constructor() {
    super()
    const customerList = tableData.map(x => x)
    this.state = { customerList }
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

  render() {
    const { customerList } = this.state

    const tableColumns = [
      {
        title: '',
        dataIndex: 'id',
        key: 'actions',
        render: id => (
          <Link to={`./${id}`}>
            <Button ghost type="primary" size="small">
              <i className="fa fa-pencil" />
            </Button>
          </Link>
        ),
      },
      {
        title: 'Nome',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Celular',
        dataIndex: 'cellphone',
        key: 'cellphone',
      },
      {
        title: 'Cidade',
        dataIndex: 'city',
        key: 'city',
      },
    ]

    return (
      <Table
        rowKey="id"
        className="utils__scrollTable"
        scroll={{ x: '100%' }}
        columns={tableColumns}
        dataSource={customerList}
        pagination={false}
      />
    )
  }
}

// const mapStateToProps = state => { }

export default connect()(CustomerList)
