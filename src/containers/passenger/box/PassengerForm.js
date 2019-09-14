import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form } from 'antd'

import actions from 'redux/step/actions'
import FormStepButtonsActions from 'components/Step/FormStepButtonsActions'
import SkeletonForm from 'components/SkeletonForm/SkeletonForm'

@Form.create()
class PassengerForm extends Component {
  constructor() {
    super()

    this.dispatchStep = this.dispatchStep.bind(this)

    this.state = {
      isLoading: true,
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isLoading: false })
    }, 1500)
  }

  dispatchStep(step) {
    const { dispatch } = this.props
    dispatch({
      type: actions.SET_STATE,
      payload: { step },
    })
  }

  render() {
    const { current, formSteps } = this.props
    const { isLoading } = this.state

    return (
      <SkeletonForm isLoading={isLoading} rows={3}>
        <Form layout="vertical" className="passenger-form">
          {formSteps.map((x, i) => current === i && <x.component key={x.title} {...this.props} />)}

          <div className="form-actions">
            <FormStepButtonsActions lastStep={formSteps.length - 1} />
          </div>
        </Form>
      </SkeletonForm>
    )
  }
}

const mapStateToProps = store => ({
  current: store.step.current,
})

export default connect(mapStateToProps)(PassengerForm)
