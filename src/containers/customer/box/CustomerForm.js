import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { useQuery, useMutation } from 'react-apollo'
import { Form, notification } from 'antd'

import FormStepButtonsActions from 'components/Step/FormStepButtonsActions'
import {
  GET_CUSTOMER_BY_ID,
  parseCustomerDetail,
  SAVE_CUSTOMER,
  serializeCustomerDetail,
  setCustomerState,
} from 'redux/customerDetail/actions'
import SkeletonForm from 'components/SkeletonForm/SkeletonForm'

const CustomerForm = ({ form, formSteps }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { customerId } = useParams()

  const [saveCustomer, { loading: saving, error }] = useMutation(SAVE_CUSTOMER)
  const { loading: getting, data: { customer: customerDetail } = {} } = useQuery(
    GET_CUSTOMER_BY_ID,
    { variables: { id: customerId }, skip: !customerId },
  )

  const initialValues = useMemo(
    () => (customerDetail?.id ? parseCustomerDetail(customerDetail) : {}),
    [customerDetail],
  )

  const saveForm = useCallback(
    async (payload) => {
      const input = serializeCustomerDetail({ ...payload, id: customerId })
      await saveCustomer({ mutation: SAVE_CUSTOMER, variables: { input } })
      notification.success({
        message: 'Sucesso',
        description: 'Novo cliente cadastrado com sucesso!',
      })
    },
    [saveCustomer, customerId],
  )
  const { current } = useSelector((state) => state.step)
  const isLoading = useMemo(() => saving || getting, [saving, getting])
  const [waitSavingAndRedirectTo, setWaitSavingAndRedirectTo] = useState(false)

  const onSaveFormAndAddNew = useCallback(() => {
    form.validateFields(async (error, values) => {
      if (!error) {
        await saveForm(values)
        setWaitSavingAndRedirectTo('/clientes')
        form.resetFields()
      }
    })
  }, [form, saveForm, setWaitSavingAndRedirectTo])

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault()
      form.validateFields(async (error, values) => {
        if (error) {
          // TODO: tratar erro
          return
        }
        await saveForm(values)
        setWaitSavingAndRedirectTo('/clientes/lista')
      })
    },
    [form, saveForm, setWaitSavingAndRedirectTo],
  )

  const saveStepHandler = useCallback(
    (fields, doSuccess) => {
      form.validateFields(fields, { first: true }, (error, values) => {
        if (error) {
          // TODO: tratar erro
          return
        }
        dispatch(setCustomerState(values))

        doSuccess()
      })
    },
    [form, dispatch],
  )

  useEffect(() => {
    if (error) {
      // TODO: tratar erro
      return
    }
    if (waitSavingAndRedirectTo && !saving) history.push(waitSavingAndRedirectTo)
  }, [waitSavingAndRedirectTo, saving, error, history])
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
export default Form.create()(CustomerForm)
