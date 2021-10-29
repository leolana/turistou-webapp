import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from 'react-apollo'
import { useHistory, useParams } from 'react-router'
import { Form, notification } from 'antd'

import FormStepButtonsActions from 'components/Step/FormStepButtonsActions'
import SkeletonForm from 'components/SkeletonForm/SkeletonForm'
import passengerActions, { SAVE_PASSENGER } from 'redux/passengerDetail/actions'
import paymentMethods from 'constants/paymentMethods'

const PassengerForm = ({ form, formSteps, getExcursionById, excursion, passengerStatus }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { excursionId } = useParams()
  const { current: currentStep } = useSelector((state) => state.step)
  const { isLoading } = useSelector((state) => state.excursionDetail)
  const [save, { loading: saving }] = useMutation(SAVE_PASSENGER)

  const onSaveFormAndAddNew = useCallback(() => {
    saveAndRedirectTo(`${history.location.pathname}`)
  }, [saveAndRedirectTo, history.location.pathname])

  const saveForm = useCallback(
    async (input) => {
      await save({ mutation: SAVE_PASSENGER, variables: { input } })
    },
    [save],
  )

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
          try {
            const { keys, ...data } = values
            const paymentConditions =
              data.paymentConditions?.filter(isPaymentConditionComplete) ?? []
            await saveForm({ ...data, excursionId, status: passengerStatus, paymentConditions })
            await getExcursionById(excursionId)
            form.resetFields()
            history.push(redirect)
            notification.success({
              message: 'Sucesso',
              description: 'Novo passageiro cadastrado com sucesso!',
            })
          } catch (e) {
            notification.error({
              message: 'Error',
              description: 'Houve algum problema ao salvar um novo passageiro!',
            })
          }
        }
      })
    },
    [form, saveForm, excursionId, passengerStatus, getExcursionById, history],
  )

  const isPaymentConditionComplete = (paymentCondition) => {
    const hasValueAndType = paymentCondition.value && paymentCondition.paymentType
    const isCreditOrBankSlip =
      paymentCondition.paymentType === paymentMethods.CREDIT_CARD ||
      paymentCondition.paymentType === paymentMethods.PAYMENT_BANK_SLIP
    const hasInstallmentProperties =
      paymentCondition.installmentQuantity && paymentCondition.paymentFirstDue
    return (
      hasValueAndType && (!isCreditOrBankSlip || (isCreditOrBankSlip && hasInstallmentProperties))
    )
  }

  return (
    <SkeletonForm isLoading={isLoading || saving} rows={3}>
      <Form id="passenger-form" hideRequiredMark colon={false} onSubmit={onSubmit}>
        {formSteps.map((x, i) => (
          <div key={x.title} hidden={currentStep !== i}>
            <x.component form={form} excursion={excursion} />
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
