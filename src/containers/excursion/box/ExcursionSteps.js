import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Steps, Popover } from 'antd'

import actions from 'redux/step/actions'

class ExcursionSteps extends Component {
  customDot = (dot, { index }) => <Popover content={<span>{index}ª etapa</span>}>{dot}</Popover>

  dispatchStep(step) {
    const { dispatch } = this.props
    dispatch({
      type: actions.SET_STATE,
      payload: { current: step },
    })
  }

  render() {
    const { current: step } = this.props
    return (
      <Steps current={step} initial={1} progressDot={this.customDot}>
        <Steps.Step onClick={() => this.dispatchStep(1)} title="Detalhes da viagem" />
        <Steps.Step onClick={() => this.dispatchStep(2)} title="Pontos de parada" />
        <Steps.Step onClick={() => this.dispatchStep(3)} title="Valores das passagens" />
        <Steps.Step onClick={() => this.dispatchStep(4)} title="Transportes" />
      </Steps>
    )
  }
}

const mapStateToProps = store => ({
  current: store.step.current,
})

export default connect(mapStateToProps)(ExcursionSteps)
