import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form } from 'antd'

import FormStepButtonsActions from 'components/Step/FormStepButtonsActions'
import SkeletonForm from 'components/SkeletonForm/SkeletonForm'

@Form.create()
class PassengerForm extends Component {
  render() {
    const { isLoading, currentStep, formSteps } = this.props

    return (
      <SkeletonForm isLoading={isLoading} rows={3}>
        <Form layout="vertical" className="passenger-form">
          {formSteps.map(
            (x, i) => currentStep === i && <x.component key={x.title} {...this.props} />,
          )}

          <div className="form-actions">
            <FormStepButtonsActions lastStep={formSteps.length - 1} />
          </div>
        </Form>
      </SkeletonForm>
    )
  }
}

const mapStateToProps = store => ({
  currentStep: store.step.current,
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(PassengerForm)
