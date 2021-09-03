import React from 'react'
import { Select } from 'antd'

export const CustomerSelect = ({ value = null, onChange, customerList = [] }, ref) => {
  return (
    <Select
      ref={ref}
      size="default"
      value={value}
      // TODO: max options show
      showSearch
      filterOption={(q, option) =>
        q.split(' ').every((x) => option.props.children.toLowerCase().includes(x))
      }
      onChange={onChange}
      dropdownRender={(menu) => <>{menu}</>}
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
