import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form } from 'antd'

import FormStepButtonsActions from 'components/Step/FormStepButtonsActions'
import SkeletonForm from 'components/SkeletonForm/SkeletonForm'

@Form.create()
class ExcursionForm extends Component {
  constructor() {
    super()

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
    const { form, dispatch } = this.props
    form.validateFields((error, values) => {
      console.log(error, values)
      if (!error) {
        dispatch({
          type: 'excursion/SAVE',
          payload: values,
        })
      }
    })
  }

  saveStepHandler = (fields, doSuccess) => {
    const { form, dispatch } = this.props
    form.validateFields(fields, { first: true }, (error, values) => {
      console.log(error, values)
      if (!error) {
        dispatch({
          type: 'excursion/SET_STATE',
          payload: values,
        })

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

export default connect(mapStateToProps)(ExcursionForm)
