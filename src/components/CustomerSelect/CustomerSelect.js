import React from 'react'
import { Select, Divider } from 'antd'

export const CustomerSelect = ({ onChange, customerList = [] }, ref) => {
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
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: '4px 0' }} />
          <div style={{ padding: '8px', cursor: 'pointer' }}>
            <i className="fa fa-plus" /> Novo cliente
          </div>
        </>
      )}
    >
      {customerList.map((x) => (
        <Select.Option key={x.id} value={x.id}>
          {`${x.name} - ${x.document.documentNumber} - ${x.address.city}`}
        </Select.Option>
      ))}
    </Select>
  )
}

export default React.forwardRef(CustomerSelect)
