import React, { Component } from 'react'
import { Form, Button } from 'antd'
import PassagerChoice from './form/PassagerChoice'
import PassagerPayment from './form/PassagerPayment'

@Form.create()
class PassagerForm extends Component {
  constructor() {
    super()

    this.state = { step: 1 }
    this.prevStep = this.prevStep.bind(this)
    this.nextStep = this.nextStep.bind(this)
  }

  prevStep() {
    const { step } = this.state
    const prevStep = step - 1
    this.setState({ step: prevStep })
  }

  nextStep() {
    const { step } = this.state
    const nextStep = step + 1
    this.setState({ step: nextStep })
  }

  render() {
    const { step } = this.state

    return (
      <Form layout="vertical" className="passager-form">
        {step === 1 && <PassagerChoice {...this.props} />}
        {step === 2 && <PassagerPayment {...this.props} />}

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

export default PassagerForm
