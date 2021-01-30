import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from 'antd'

import { fetchCustomers } from 'redux/customerList/actions'
import SkeletonTable from 'components/SkeletonTable/SkeletonTable'

const CustomerList = () => {
  const dispatch = useDispatch()
  const { /* filter, */ payload: customers, isLoading } = useSelector((state) => state.customerList)

  useEffect(() => {
    dispatch(fetchCustomers())
  }, [dispatch])

  // FIXME: filters
  // const filterCustomers = useCallback(() => {
  //   const { query } = filter

  //   let filteredData = customers
  //   if (query) {
  //     const lowerQuery = query.toLowerCase()
  //     filteredData = filteredData.filter(customer => {
  //       const { name, city } = customer
  //       const customData = `${name.toLowerCase()} ${city.toLowerCase()}`

  //       if (customData.includes(lowerQuery)) return true
  //       return lowerQuery.split(' ').every(q => customData.includes(q.trim()))
  //     })
  //   }
  //   return filteredData
  // }, [customers, filter])

  // FIXME: filters
  // const filteredData = useMemo(() => filterCustomers(), [])
  // console.log('filteredData', filteredData)

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

  return <SkeletonTable isLoading={isLoading} tableData={customers} tableColumns={tableColumns} />
}

export default CustomerList
