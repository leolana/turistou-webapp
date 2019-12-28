import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form } from 'antd'

import FormStepButtonsActions from 'components/Step/FormStepButtonsActions'
import SkeletonForm from 'components/SkeletonForm/SkeletonForm'
import actions from 'redux/customerDetail/actions'
import { push } from 'connected-react-router'

@Form.create()
class CustomerForm extends Component {
  onSaveFormAndAddNew = () => {
    const { form, saveForm, resetForm } = this.props

    form.validateFields(async (error, values) => {
      if (!error) {
        await saveForm(values)
        resetForm()
      }
    })
  }

  onSubmit = event => {
    event.preventDefault()
    const { form, saveForm, redirectToCustomerList } = this.props
    form.validateFields(async (error, values) => {
      if (!error) {
        await saveForm(values)
        redirectToCustomerList()
      }
    })
  }

  saveStepHandler = (fields, doSuccess) => {
    const { form, saveStep } = this.props
    form.validateFields(fields, { first: true }, (error, values) => {
      if (!error) {
        saveStep(values)

        doSuccess()
      }
    })
  }

  render() {
    const { currentStep, formSteps, form, isLoading } = this.props

    return (
      <SkeletonForm isLoading={isLoading}>
        <Form layout="vertical" className="customer-form">
          {formSteps.map((x, i) => (
            <div key={x.title} style={{ display: currentStep === i ? 'block' : 'none' }}>
              <x.component form={form} />
              <div className="form-actions">
                <FormStepButtonsActions
                  lastStep={formSteps.length - 1}
                  validationFields={x.fields}
                  onSaveStep={this.saveStepHandler}
                  onSaveFormAndAddNew={this.onSaveFormAndAddNew}
                />
              </div>
            </div>
          ))}
        </Form>
      </SkeletonForm>
    )
  }
}

const mapStateToProps = ({ step }) => ({
  currentStep: step.current,
})

const mapDispatchToProps = dispatch => ({
  saveStep: values => dispatch({ type: actions.SET_STATE, payload: values }),
  saveForm: values => dispatch({ type: actions.SAVE_CUSTOMER, payload: values }),
  resetForm: () => dispatch(push('/clientes')),
  redirectToCustomerList: () => dispatch(push('/clientes/list')),
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerForm)
