import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import FormSteps from 'components/Step/FormSteps'

import actions from 'redux/customerDetail/actions'
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

@connect(({ user }) => ({ user }))
class Customers extends Component {
  onSubmit = event => {
    event.preventDefault()
    const { form, dispatch } = this.props
    form.validateFields((error, values) => {
      if (!error) {
        dispatch({
          type: actions.SAVE_CUSTOMER,
          payload: values,
        })
      }
    })
  }

  render() {
    return (
      <div>
        <Helmet title={pageTitle} />
        <div className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>{pageTitle}</strong>
            </div>
          </div>
          <div className="card-header">
            <FormSteps formSteps={formSteps} {...this.props} />
          </div>
          <div className="card-body">
            <CustomerForm formSteps={formSteps} {...this.props} />
          </div>
        </div>
      </div>
    )
  }
}

export default Customers
