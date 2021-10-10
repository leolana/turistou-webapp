import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Input, Form } from 'antd'

import actions from 'redux/customerList/actions'

const CustomerFilter = () => {
  const dispatch = useDispatch()

  const handleChangeQuery = useCallback(
    (e) => {
      const query = e.target.value
      dispatch({
        type: actions.SET_STATE,
        payload: { filter: { query } },
      })
    },
    [dispatch],
  )

  return (
    <Form layout="inline" className="mb-1">
      <Input
        type="text"
        addonBefore={<i className="fa fa-search" />}
        onChange={handleChangeQuery}
      />
    </Form>
  )
}

export default CustomerFilter
