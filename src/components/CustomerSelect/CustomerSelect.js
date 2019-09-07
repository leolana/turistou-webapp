import React from 'react'
import { Select, Divider } from 'antd'

const CustomerSelect = ({ customers }) => (
  <Select
    size="default"
    // TODO: max options show
    showSearch
    filterOption={(q, option) =>
      q.split(' ').every(x => option.props.children.toLowerCase().includes(x))
    }
    dropdownRender={menu => (
      <div>
        {menu}
        <Divider style={{ margin: '4px 0' }} />
        <div style={{ padding: '8px', cursor: 'pointer' }}>
          <i className="fa fa-plus" /> Novo cliente
        </div>
      </div>
    )}
  >
    {customers.map(x => (
      <Select.Option key={x.id} value={x.id}>
        {`${x.name} - ${x.rg} - ${x.city}`}
      </Select.Option>
    ))}
  </Select>
)
export default CustomerSelect
