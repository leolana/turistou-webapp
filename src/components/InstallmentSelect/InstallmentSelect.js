import React, { useMemo, useCallback } from 'react'
import { Select } from 'antd'

const InstallmentSelect = ({ onChange, price, maxInstallment = 10 }, ref) => {
  const createSelectLabel = (value) => (x) =>
    (
      <>
        {x}&times; {`(${value ? (value / x).toFixed(2) : ''})`}
      </>
    )

  const selectLabel = useCallback(createSelectLabel(price), [price])

  const installments = useMemo(
    () =>
      Array(maxInstallment)
        .fill(null)
        .map((_, i) => i + 1)
        .map((x) => (
          <Select.Option key={x} value={x}>
            {x === 1 ? 'À vista / Parcela única' : selectLabel(x)}
          </Select.Option>
        )),
    [maxInstallment, selectLabel],
  )

  return (
    <Select onChange={onChange} ref={ref}>
      {installments}
    </Select>
  )
}

export default React.forwardRef(InstallmentSelect)
