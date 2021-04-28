import React, { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { Button } from 'antd'

import { FETCH_CUSTOMERS } from 'redux/customerList/actions'
import SkeletonTable from 'components/SkeletonTable/SkeletonTable'

const CustomerList = () => {
  const { filter } = useSelector((state) => state.customerList)

  const { loading: isLoading, data: { customers } = {}, refetch: getCustomers } = useQuery(
    FETCH_CUSTOMERS,
  )

  useEffect(() => {
    getCustomers()
  }, [getCustomers])

  const filteredData = useMemo(() => {
    const { query } = filter

    let filteredData = customers
    if (query) {
      const lowerQuery = query.toLowerCase()
      filteredData = filteredData.filter((customer) => {
        const { name = '', city = '' } = customer
        const customData = `${name.toLowerCase()} ${city.toLowerCase()}`

        if (customData.includes(lowerQuery)) return true

        return lowerQuery.split(' ').every((q) => customData.includes(q.trim()))
      })
    }
    return filteredData
  }, [customers, filter])

  const tableColumns = useMemo(
    () => [
      {
        dataIndex: 'id',
        key: 'actions',
        render: (id) => (
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
        dataIndex: 'address.city',
        key: 'city',
      },
    ],
    [],
  )

  return (
    <SkeletonTable isLoading={isLoading} tableData={filteredData} tableColumns={tableColumns} />
  )
}

export default CustomerList
