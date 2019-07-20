import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, Button } from 'antd'

import { tableData as mockData } from 'mock/customers'

class CustomerList extends Component {
  constructor() {
    super()
    this.state = { tableData: mockData }

    this.filter = this.filter.bind(this)
  }

  filter() {
    const { query } = this.props
    const { tableData } = this.state

    let filteredData = tableData
    if (query) {
      const lowerQuery = query.toLowerCase()
      filteredData = filteredData.filter(customer => {
        const { name, city } = customer
        const customData = `${name.toLowerCase()} ${city.toLowerCase()}`

        if (customData.includes(lowerQuery)) return true

        return lowerQuery.split(' ').every(q => customData.includes(q.trim()))
      })
    }
    return filteredData
  }

  render() {
    const filteredData = this.filter()

    const tableColumns = [
      {
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
        dataSource={filteredData}
        pagination={false}
      />
    )
  }
}

const mapStateToProps = state => ({
  query: state.excursion.query,
})

export default connect(mapStateToProps)(CustomerList)
