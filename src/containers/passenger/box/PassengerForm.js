import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Form } from 'antd'

import FormStepButtonsActions from 'components/Step/FormStepButtonsActions'
import SkeletonForm from 'components/SkeletonForm/SkeletonForm'
import passengerActions from 'redux/passengerDetail/actions'

const PassengerForm = ({ form, formSteps, passengerStatus }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { current: currentStep } = useSelector((state) => state.step)
  const { isLoading } = useSelector((state) => state.excursionDetail)

  const onSaveFormAndAddNew = useCallback(() => {
    saveAndRedirectTo(`${history.location.pathname}`)
  }, [saveAndRedirectTo, history.location.pathname])

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault()
      const passengersRoute = history.location.pathname.replace('/booked', '')
      saveAndRedirectTo(`${passengersRoute}/list`)
    },
    [history.location.pathname, saveAndRedirectTo],
  )

  const saveStepHandler = useCallback(
    (fields, doSuccess) => {
      form.validateFields(fields, { first: true }, (error, values) => {
        if (!error) {
          // TO DO: PERGUNTAR SE DEVO INSERIR STATUS NO PAYLOAD
          dispatch({ type: passengerActions.SET_PAYLOAD, payload: values })

          doSuccess()
        }
      })
    },
    [form, dispatch],
  )

  const saveAndRedirectTo = useCallback(
    (redirect) => {
      form.validateFields(async (error, values) => {
        if (!error) {
          const { keys, ...data } = values
          await dispatch({
            type: passengerActions.SAVE_PASSENGER,
            payload: { status: passengerStatus, ...data },
          })
          form.resetFields()
          history.push(redirect)
        }
      })
    },
    [form, dispatch, passengerStatus, history],
  )

  return (
    <SkeletonForm isLoading={isLoading} rows={3}>
      <Form id="passenger-form" hideRequiredMark colon={false} onSubmit={onSubmit}>
        {formSteps.map((x, i) => (
          <div key={x.title} hidden={currentStep !== i}>
            <x.component form={form} />
            <div className="form-actions">
              <FormStepButtonsActions
                lastStep={formSteps.length - 1}
                validationFields={x.fields}
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

export default Form.create()(PassengerForm)
