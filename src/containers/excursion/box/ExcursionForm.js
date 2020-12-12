import React, { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { Form } from 'antd'

import actions from 'redux/excursionDetail/actions'
import FormStepButtonsActions from 'components/Step/FormStepButtonsActions'
import SkeletonForm from 'components/SkeletonForm/SkeletonForm'

const ExcursionForm = ({ form, formSteps }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const { isLoading } = useSelector((state) => state.excursionDetail)
  const { current } = useSelector((state) => state.step)

  const { payload: excursionDetail } = useSelector((state) => state.excursionDetail)
  const initialValues = useMemo(() => {
    return excursionDetail.id ? excursionDetail : {}
  }, [excursionDetail])

  const saveForm = useCallback((payload) => dispatch({ type: actions.SAVE_EXCURSION, payload }), [
    dispatch,
  ])

  const onSaveFormAndAddNew = useCallback(() => {
    form.validateFields(async (error, values) => {
      if (!error) {
        await saveForm(values)
        history.push('/excursion')
      }
    })
  }, [form, history, saveForm])

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault()
      form.validateFields(async (error, values) => {
        if (!error) {
          await saveForm(values)
          history.push('/excursion/list')
        }
      })
    },
    [form, history, saveForm],
  )

  const saveStepHandler = useCallback(
    (fields, doSuccess) => {
      form.validateFields(fields, { first: true }, (error, values) => {
        if (!error) {
          dispatch({ type: actions.SET_STATE, payload: values })

          doSuccess()
        }
      })
    },
    [form, dispatch],
  )

  return (
    <SkeletonForm isLoading={isLoading}>
      <Form layout="vertical" className="customer-form" onSubmit={onSubmit}>
        {formSteps.map((x, i) => (
          <div key={x.title} hidden={current !== i}>
            <x.component form={form} initialValues={initialValues} />
            <div className="form-actions">
              <FormStepButtonsActions
                lastStep={formSteps.length - 1}
                validationFields={x.fields}
                // todo: da para utilizar curring com ramda.js
                onSaveStep={saveStepHandler}
                onSaveFormAndAddNew={onSaveFormAndAddNew}
              />
            </div>
          </div>
        ))}
      </Form>
    </SkeletonForm>
  )
}

export default Form.create()(ExcursionForm)
