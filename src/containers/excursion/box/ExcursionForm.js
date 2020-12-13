import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form } from 'antd'
import { push } from 'react-router-redux'

import actions from '@redux/excursionDetail/actions'
import FormStepButtonsActions from '@components/Step/FormStepButtonsActions'
import SkeletonForm from '@components/SkeletonForm/SkeletonForm'

@Form.create()
class ExcursionForm extends Component {
  onSaveFormAndAddNew = () => {
    const { form, saveForm, resetForm } = this.props
    form.validateFields(async (error, values) => {
      if (!error) {
        await saveForm(values)
        resetForm()
      }
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    const { form, saveForm, redirectToExcursionList } = this.props
    form.validateFields(async (error, values) => {
      if (!error) {
        await saveForm(values)
        redirectToExcursionList()
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
    const { current, formSteps, form, isLoading } = this.props

    return (
      <SkeletonForm isLoading={isLoading}>
        <Form layout="vertical" className="customer-form" onSubmit={this.onSubmit}>
          {formSteps.map((x, i) => (
            <div key={x.title} style={{ display: current === i ? 'block' : 'none' }}>
              <x.component form={form} />
              <div className="form-actions">
                <FormStepButtonsActions
                  lastStep={formSteps.length - 1}
                  validationFields={x.fields}
                  // todo: da para utilizar curring com ramda.js
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

const mapStateToProps = (store) => ({
  current: store.step.current,
  isLoading: store.excursionDetail.isLoading,
})

const mapDispatchToProps = (dispatch) => ({
  saveStep: (values) => dispatch({ type: actions.SET_STATE, payload: values }),
  saveForm: (values) => dispatch({ type: actions.SAVE_EXCURSION, payload: values }),
  resetForm: () => dispatch(push('/excursion')),
  redirectToExcursionList: () => dispatch(push('/excursion/list')),
})

export default connect(mapStateToProps, mapDispatchToProps)(ExcursionForm)
