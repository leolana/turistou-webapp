import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Radio, Input, Row, Col } from 'antd'

import { EXCURSION_STATUS } from 'constants/excursionStatus'
import actions from 'redux/excursionList/actions'

const ExcursionFilter = ({ defaultFilter, setFilter }) => {
  const dispatch = useDispatch()
  const handleChangeFilterProperty = useCallback(
    (property, value) => {
      setFilter((filter) => ({ ...filter, [property]: value }))
      dispatch({ type: actions.SET_STATE, payload: { isLoading: true } })
      setTimeout(() => {
        dispatch({ type: actions.SET_STATE, payload: { isLoading: false } })
      }, 300)
    },
    [setFilter, dispatch],
  )

  return (
    <Form layout="inline" className="mb-1">
      <Row>
        <Col md={12}>
          <Radio.Group
            onChange={(e) => handleChangeFilterProperty('statusId', e.target.value)}
            buttonStyle="solid"
            defaultValue={defaultFilter.statusId}
          >
            {EXCURSION_STATUS.map((x) => (
              <Radio.Button key={x.id} value={x.id}>
                {x.description}
              </Radio.Button>
            ))}
          </Radio.Group>
        </Col>
        <Col md={12}>
          <Input
            type="text"
            addonBefore={<i className="fa fa-search" />}
            onChange={(e) => handleChangeFilterProperty('query', e.target.value)}
            defaultValue={defaultFilter.query}
          />
        </Col>
      </Row>
    </Form>
  )
}

export default ExcursionFilter
