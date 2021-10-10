import React from 'react'
import { Helmet } from 'react-helmet'
import FormSteps from 'components/Step/FormSteps'
import { Card } from 'antd'

import CustomerForm from './CustomerForm'
import CustomerPersonal, { formFields as customerPersonalFormFields } from './form/CustomerPersonal'
import CustomerAddress, { formFields as customerAddressFormFields } from './form/CustomerAddress'
import CustomerContact, { formFields as customerContactFormFields } from './form/CustomerContact'
import CustomerEmergency, {
  formFields as customerEmergencyFormFields,
} from './form/CustomerEmergency'
import CustomerAdditionalInfo, {
  formFields as customerAdditionalInfoFormFields,
} from './form/CustomerAdditionalInfo'

const pageTitle = 'Novo cliente'
const formSteps = [
  { component: CustomerPersonal, title: 'Dados pessoais', fields: customerPersonalFormFields },
  { component: CustomerAddress, title: 'Endereço', fields: customerAddressFormFields },
  { component: CustomerContact, title: 'Contato', fields: customerContactFormFields },
  { component: CustomerEmergency, title: 'Emergência', fields: customerEmergencyFormFields },
  {
    component: CustomerAdditionalInfo,
    title: 'Informações adicionais',
    fields: customerAdditionalInfoFormFields,
  },
]

const Customers = (props) => {
  // const dispatch = useDispatch()

  // const onSubmit = useCallback(event => {
  //   event.preventDefault()
  //   const { form } = props
  //   form.validateFields((error, values) => {
  //     if (!error) {
  //       dispatch({
  //         type: actions.SAVE_CUSTOMER,
  //         payload: values,
  //       })
  //     }
  //   })
  // }, [props, dispatch])

  return (
    <>
      <Helmet title={pageTitle} />

      <Card>
        <div className="card-header">
          <div className="utils__title">
            <strong>{pageTitle}</strong>
          </div>
        </div>
        <div className="card-header">
          <FormSteps formSteps={formSteps} {...props} />
        </div>
        <div className="card-body">
          <CustomerForm formSteps={formSteps} {...props} />
        </div>
      </Card>
    </>
  )
}

export default Customers
