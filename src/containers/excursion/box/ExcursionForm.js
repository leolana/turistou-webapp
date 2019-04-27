import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'antd'
import actions from 'redux/step/actions'

import ExcursionDetail from './form/ExcursionDetail'
import ExcursionStopPoint from './form/ExcursionStopPoint'
import ExcursionPricing from './form/ExcursionPricing'
import ExcursionTransport from './form/ExcursionTransport'

@Form.create()
class ExcursionForm extends Component {
  constructor(props) {
    super(props)

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
    const { fetching } = this.props
    const { step } = this.state

    return (
      <Form layout="vertical" className="customer-form" onSubmit={this.onSubmit}>
        {/* TODO: Refine all messages required field */}
        {step === 1 && <ExcursionDetail {...this.props} />}
        {step === 2 && <ExcursionStopPoint {...this.props} />}
        {step === 3 && <ExcursionPricing {...this.props} />}
        {step === 4 && <ExcursionTransport {...this.props} />}

        <div className="form-actions">
          <Button onClick={this.prevStep}>Voltar</Button>
          <Button onClick={this.nextStep}>Próximo</Button>
          <Button type="primary" htmlType="submit" loading={fetching}>
            Salvar
          </Button>
        </div>
      </Form>
    )
  }
}
export default connect()(ExcursionForm)
