import React, { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { Form } from 'antd'

import {
  SAVE_EXCURSION,
  GET_EXCURSION_BY_ID,
  setExcursionState,
  sequelizeExcursionDetail,
} from 'redux/excursionDetail/actions'
import FormStepButtonsActions from 'components/Step/FormStepButtonsActions'
import SkeletonForm from 'components/SkeletonForm/SkeletonForm'

const ExcursionForm = ({ form, formSteps }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { excursionId } = useParams()

  const [save, { loading: saving }] = useMutation(SAVE_EXCURSION)
  const {
    loading: getting,
    data: { excursion: excursionDetail } = {},
  } = useQuery(GET_EXCURSION_BY_ID, { variables: { id: excursionId } })

  const { current } = useSelector((state) => state.step)

  const initialValues = useMemo(() => {
    return excursionDetail?.id ? excursionDetail : {}
  }, [excursionDetail])

  const isLoading = useMemo(() => saving || getting, [saving, getting])

  const saveForm = useCallback(
    (payload) => {
      const input = sequelizeExcursionDetail({ ...payload, id: excursionId })
      save({ mutation: SAVE_EXCURSION, variables: { input } })
    },
    [save, excursionId],
  )

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
        if (error) {
          // TODO: tratar erro
          return
        }
        await saveForm(values)
        history.push('/excursion/list')
      })
    },
    [form, history, saveForm],
  )

  const saveStepHandler = useCallback(
    (fields, doSuccess) => {
      form.validateFields(fields, { first: true }, (error, values) => {
        if (error) {
          // TODO: tratar erro
          return
        }
        dispatch(setExcursionState(values))

        doSuccess()
      })
    },
    [form, dispatch],
  )

  return (
    <SkeletonForm isLoading={isLoading}>
      <Form layout="vertical" className="excursion-form" onSubmit={onSubmit}>
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
