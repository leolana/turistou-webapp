import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Steps, Popover } from 'antd'

// TODO: hover com detalhes?
const customDot = (dot, { index }) => (
  <Popover content={<span>{index + 1}ª etapa</span>}>{dot}</Popover>
)

class PassengerSteps extends Component {
  render() {
    const { step } = this.props

    return (
      <Steps current={step} initial={1} progressDot={customDot} className="mb-5">
        <Steps.Step title="Passageiro" />
        <Steps.Step title="Cobrança" />
        <Steps.Step title="Assentos" />
      </Steps>
    )
  }
}

const mapStateToProps = store => {
  console.log('step', store)
  return { step: store.step.step }
}
export default connect(mapStateToProps)(PassengerSteps)
