import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Steps, Popover } from 'antd'

// TODO: hover com detalhes?
const customDot = (dot, { index }) => (
  <Popover content={<span>{index + 1}ª etapa</span>}>{dot}</Popover>
)

class ExcursionSteps extends Component {
  render() {
    const { step } = this.props
    return (
      <Steps current={step} initial={1} progressDot={customDot}>
        <Steps.Step title="Detalhes da viagem" />
        <Steps.Step title="Pontos de parada" />
        <Steps.Step title="Valores das passagens" />
        <Steps.Step title="Transportes" />
      </Steps>
    )
  }
}
const mapStateToProps = store => {
  console.log('step', store.step.step)
  return { step: store.step.step }
}

export default connect(mapStateToProps)(ExcursionSteps)
