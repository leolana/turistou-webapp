import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'antd'

import actions from 'redux/step/actions'
import PassengerChoice from './form/PassengerChoice'
import PassengerPayment from './form/PassengerPayment'
import PassengerPlace from './form/PassengerPlace'

@Form.create()
class PassengerForm extends Component {
  constructor() {
    super()

    this.state = { step: 1 }
    this.prevStep = this.prevStep.bind(this)
    this.nextStep = this.nextStep.bind(this)
    this.dispatchStep = this.dispatchStep.bind(this)
  }

  dispatchStep(step) {
    const { dispatch } = this.props
    dispatch({
      type: actions.SET_STATE,
      payload: { step },
    })
  }

  prevStep() {
    const { step } = this.state
    const prevStep = step - 1
    this.setState({ step: prevStep })
    this.dispatchStep(prevStep)
  }

  nextStep() {
    const { step } = this.state
    const nextStep = step + 1
    this.setState({ step: nextStep })
    this.dispatchStep(nextStep)
  }

  render() {
    const { step } = this.state

    return (
      <Form layout="vertical" className="passenger-form">
        {step === 1 && <PassengerChoice {...this.props} />}
        {step === 2 && <PassengerPayment {...this.props} />}
        {step === 3 && <PassengerPlace {...this.props} />}

        <div className="form-actions">
          <Button onClick={this.prevStep}>Voltar</Button>
          <Button onClick={this.nextStep} type="primary" htmlType="submit">
            Próximo
          </Button>
        </div>
      </Form>
    )
  }
}

export default connect()(PassengerForm)
