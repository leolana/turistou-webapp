import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from 'antd'

import { tableData as mockData } from 'mock/customers'
import SkeletonTable from 'components/SkeletonTable/SkeletonTable'

class CustomerList extends Component {
  constructor() {
    super()
    this.state = {
      tableData: mockData,
      isLoading: true,
    }

    this.filter = this.filter.bind(this)
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isLoading: false })
    }, 1500)
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
    const { isLoading } = this.state

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

    const props = { isLoading, tableData: filteredData, tableColumns }

    return <SkeletonTable {...props} />
  }
}

const mapStateToProps = state => ({
  query: state.excursion.query,
})

export default connect(mapStateToProps)(CustomerList)
