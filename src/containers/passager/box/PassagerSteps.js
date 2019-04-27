import React, { Component } from 'react'
import { Steps, Popover } from 'antd'

// TODO: hover com detalhes?
const customDot = (dot, { index }) => (
  <Popover content={<span>{index + 1}ª etapa</span>}>{dot}</Popover>
)

class PassagerSteps extends Component {
  constructor() {
    super()
    this.state = { step: 1 }
  }

  render() {
    const { step } = this.state

    return (
      <Steps current={step} initial={1} progressDot={customDot} className="mb-5">
        <Steps.Step title="Passageiro" />
        <Steps.Step title="Cobrança" />
        <Steps.Step title="Acentos" />
      </Steps>
    )
  }
}

export default PassagerSteps
