import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'antd'

import actions from 'redux/step/actions'
import FormStepButtonsActions from 'components/Step/FormStepButtonsActions'

@Form.create()
class PassengerForm extends Component {
  constructor() {
    super()

    this.dispatchStep = this.dispatchStep.bind(this)
  }

  dispatchStep(step) {
    const { dispatch } = this.props
    dispatch({
      type: actions.SET_STATE,
      payload: { step },
    })
  }

  render() {
    const { fetching, current: step, formSteps } = this.props

    return (
      <Form layout="vertical" className="passenger-form">
        {formSteps.map((x, i) => step === i && <x.component key={x.title} {...this.props} />)}

        <div className="form-actions">
          <FormStepButtonsActions lastStep={formSteps.length - 1} />
          <Button type="primary" htmlType="submit" loading={fetching}>
            Salvar
          </Button>
        </div>
      </Form>
    )
  }
}

const mapStateToProps = store => ({
  current: store.step.current,
})

export default connect(mapStateToProps)(PassengerForm)
