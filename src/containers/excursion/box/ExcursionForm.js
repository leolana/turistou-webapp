import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form } from 'antd'

import actions from 'redux/excursionDetail/actions'
import FormStepButtonsActions from 'components/Step/FormStepButtonsActions'
import SkeletonForm from 'components/SkeletonForm/SkeletonForm'

@Form.create()
class ExcursionForm extends Component {
  constructor() {
    super()
    // FIXME: commented code and isloading

    this.state = {
      isLoading: false,
    }
  }

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({ isLoading: false })
  //   }, 1500)
  // }

  onSubmit = event => {
    event.preventDefault()
    const { form, saveForm } = this.props
    form.validateFields((error, values) => {
      if (!error) {
        saveForm(values)
      }
    })
  }

  saveStepHandler = (fields, doSuccess) => {
    const { form, saveStep } = this.props
    form.validateFields(fields, { first: true }, (error, values) => {
      console.log(error, values)
      if (!error) {
        saveStep(values)

        doSuccess()
      }
    })
  }

  render() {
    const { current, formSteps, form } = this.props
    const { isLoading } = this.state

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
                />
              </div>
            </div>
          ))}
        </Form>
      </SkeletonForm>
    )
  }
}

const mapStateToProps = store => ({
  current: store.step.current,
})

const mapDispatchToProps = dispatch => ({
  saveStep: values => dispatch({ type: actions.SET_STATE, payload: values }),
  saveForm: values => dispatch({ type: actions.SAVE_EXCURSION, payload: values }),
})

export default connect(mapStateToProps, mapDispatchToProps)(ExcursionForm)
