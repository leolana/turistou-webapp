import React from 'react'
import { Select } from 'antd'

const CustomerSelect = ({ customers }) => (
  <Select
    size="default"
    showSearch
    filterOption={(q, option) =>
      q.split(' ').every(x =>
        option.props.children
          .join('')
          .toLowerCase()
          .includes(x),
      )
    }
  >
    {customers.map(x => (
      <Select.Option key={x.id} value={x.id}>
        {x.name} - {x.rg} - {x.city}
      </Select.Option>
    ))}
  </Select>
)
export default CustomerSelect
