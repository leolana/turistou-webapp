import React, { useMemo } from 'react'
import { Select } from 'antd'

import style from './style.module.scss'

const defaultProps = {
  onChange: () => {},
  status: 'pending',
}

const PaymentSelect = ({ status, onChange }) => {
  const options = useMemo(
    () => [
      {
        id: 1,
        description: 'Pago',
        value: 'paid',
        className: style.paid,
      },
      {
        id: 2,
        description: 'A Pagar',
        value: 'pending',
        className: style.pending,
      },
      {
        id: 3,
        description: 'Cancelado',
        value: 'canceled',
        className: style.canceled,
      },
    ],
    [],
  )

  return (
    <Select
      value={status.toLowerCase()}
      className={options.filter(o => o.value === status.toLowerCase())[0].className}
      onChange={onChange}
    >
      {options.map(option => (
        <Select.Option key={option.id} value={option.value} className={option.className}>
          {option.description}
        </Select.Option>
      ))}
    </Select>
  )
}

PaymentSelect.defaultProps = defaultProps

export default PaymentSelect
