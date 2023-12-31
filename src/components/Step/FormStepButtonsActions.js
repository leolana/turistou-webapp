import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { Button } from 'antd'

import actions from 'redux/step/actions'

const FormStepButtonsActions = (props) => {
  const { lastStep, onSaveStep, onSaveFormAndAddNew, validationFields } = props

  const dispatch = useDispatch()

  const { current } = useSelector((state) => state.step)

  const dispatchStep = (current) => {
    dispatch({
      type: actions.SET_STATE,
      payload: { current },
    })
  }

  return (
    <>
      <Button
        onClick={() => onSaveStep([], () => dispatchStep(current - 1))}
        disabled={current === 0}
      >
        <FormattedMessage id="back" />
      </Button>
      <Button
        type="primary"
        onClick={() => onSaveStep(validationFields, () => dispatchStep(current + 1))}
        hidden={current >= lastStep}
      >
        <FormattedMessage id="next" />
      </Button>
      <Button
        type="primary"
        ghost
        onClick={() => {
          onSaveFormAndAddNew()
          dispatchStep(0)
        }}
        hidden={current !== lastStep}
      >
        <FormattedMessage id="saveAndNew" />
      </Button>
      <Button type="primary" htmlType="submit" hidden={current !== lastStep}>
        <FormattedMessage id="save" />
      </Button>
    </>
  )
}

export default FormStepButtonsActions
