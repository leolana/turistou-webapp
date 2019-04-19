import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'antd'

import ExcursionDetail from './form/1_detail'
import ExcursionPricing from './form/3_pricing'
import ExcursionTransport from './form/4_transport'

@Form.create()
class ExcursionForm extends Component {
  constructor(props) {
    super(props)

    this.state = { step: props.step || 0 }

    this.prevStep = this.prevStep.bind(this)
    this.nextStep = this.nextStep.bind(this)
  }

  prevStep() {
    const { step } = this.state
    const prevStep = step - 1
    this.setState({ step: prevStep })

    console.log('prevStep', prevStep)
  }

  nextStep() {
    const { step } = this.state
    const nextStep = step + 1
    this.setState({ step: nextStep })

    console.log('nextStep', nextStep)
  }

  render() {
    const { fetching } = this.props
    const { step } = this.state

    return (
      <Form layout="vertical" className="customer-form" onSubmit={this.onSubmit}>
        {/* TODO: Refine all messages required field */}
        {step === 0 && <ExcursionDetail {...this.props} />}
        {step === 1 && <ExcursionPricing {...this.props} />}
        {step === 2 && <ExcursionPricing {...this.props} />}
        {step === 3 && <ExcursionTransport {...this.props} />}

        <div className="form-actions">
          <Button className="mr-2" onClick={this.prevStep}>
            Voltar
          </Button>
          <Button className="mr-2" onClick={this.nextStep}>
            Próximo
          </Button>
          <Button type="primary" htmlType="submit" loading={fetching}>
            Salvar
          </Button>
        </div>
      </Form>
    )
  }
}
function mapToProps(state) {
  return { step: state.step }
}
export default connect(mapToProps)(ExcursionForm)
