import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import FormSteps from 'components/Step/FormSteps'

import CustomerForm from './CustomerForm'
import CustomerPersonal from './form/CustomerPersonal'
import CustomerAddress from './form/CustomerAddress'
import CustomerContact from './form/CustomerContact'
import CustomerEmergency from './form/CustomerEmergency'
import CustomerAdditionalInfo from './form/CustomerAdditionalInfo'

const pageTitle = 'Novo cliente'
const formSteps = [
  { component: CustomerPersonal, title: 'Dados pessoais' },
  { component: CustomerAddress, title: 'Endereço' },
  { component: CustomerContact, title: 'Contato' },
  { component: CustomerEmergency, title: 'Emergência' },
  { component: CustomerAdditionalInfo, title: 'Informações adicionais' },
]

@connect(({ user }) => ({ user }))
class Customers extends Component {
  onSubmit = event => {
    event.preventDefault()
    const { form, dispatch } = this.props
    form.validateFields((error, values) => {
      if (!error) {
        dispatch({
          type: 'customer/SAVE',
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
