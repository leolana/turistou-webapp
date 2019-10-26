import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from 'antd'

import actions from 'redux/customer/actions'
import SkeletonTable from 'components/SkeletonTable/SkeletonTable'

class CustomerList extends Component {
  componentDidMount() {
    const { getCustomers } = this.props
    getCustomers()
  }

  filterCustomers(customers) {
    const {
      filter: { query },
    } = this.props

    let filteredData = customers
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
    const { isLoading, customers } = this.props
    // FIXME: filters
    // const filteredData = this.filterCustomers(customers)

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

    return <SkeletonTable isLoading={isLoading} tableData={customers} tableColumns={tableColumns} />
  }
}

const mapStateToProps = ({ customer }) => ({
  query: customer.query,
  customers: customer.payload,
})

const mapDispatchToProps = dispatch => ({
  getCustomers: () => dispatch({ type: actions.GET_CUSTOMERS }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomerList)
