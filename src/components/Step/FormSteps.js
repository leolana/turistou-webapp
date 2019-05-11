import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Steps, Popover } from 'antd'

import actions from 'redux/step/actions'

class FormSteps extends Component {
  constructor(props) {
    super(props)

    this.dispatchStep = this.dispatchStep.bind(this)
    this.dispatchStep(0)
  }

  customDot = (dot, { index }) => <Popover content={<span>{index + 1}ª etapa</span>}>{dot}</Popover>

  dispatchStep(step) {
    const { dispatch } = this.props
    dispatch({
      type: actions.SET_STATE,
      payload: { current: step },
    })
  }

  render() {
    const { current: step, formSteps } = this.props
    return (
      <Steps current={step} progressDot={this.customDot}>
        {formSteps.map((x, i) => (
          <Steps.Step key={x.id} onClick={() => this.dispatchStep(i)} title={x.title} />
        ))}
      </Steps>
    )
  }
}

const mapStateToProps = store => ({
  current: store.step.current,
})

export default connect(mapStateToProps)(FormSteps)
