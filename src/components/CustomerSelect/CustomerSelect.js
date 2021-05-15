import React, { useEffect } from 'react'
import { Select } from 'antd'
import { useQuery } from '@apollo/react-hooks'

import { FETCH_CUSTOMERS, setCustomerListState } from 'redux/customerList/actions'

export const CustomerSelect = ({ onChange }, ref) => {
  const { data: { customers = [] } = {} } = useQuery(FETCH_CUSTOMERS)

  useEffect(() => {
    setCustomerListState({ payload: customers })
  }, [customers])

  return (
    <Select
      ref={ref}
      size="default"
      // TODO: max options show
      showSearch
      filterOption={(q, option) =>
        q.split(' ').every((x) => option.props.children.toLowerCase().includes(x))
      }
      onChange={onChange}
      // FIXME: descomentar este botão quando consertar
      // dropdownRender={(menu) => (
      //   <>
      //     {menu}
      //     <Divider style={{ margin: '4px 0' }} />
      //     <div style={{ padding: '8px', cursor: 'pointer' }}>
      //       <i className="fa fa-plus" /> Novo cliente
      //     </div>
      //   </>
      // )}
    >
      {customers.map((x) => (
        <Select.Option key={x.id} value={x.id}>
          {`${x.name} - ${x.document.documentNumber} - ${x.address.city}`}
        </Select.Option>
      ))}
    </Select>
  )
}

export default React.forwardRef(CustomerSelect)
