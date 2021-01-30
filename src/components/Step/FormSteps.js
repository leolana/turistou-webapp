import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Steps, Popover } from 'antd'

import actions from '@redux/step/actions'

class FormSteps extends Component {
  constructor(props) {
    super(props)

    this.dispatchStep = this.dispatchStep.bind(this)
    this.dispatchStep(0)
  }

  customDot = (dot, { index }) => <Popover content={<span>{index + 1}ª etapa</span>}>{dot}</Popover>

  dispatchStep(current) {
    const { dispatch } = this.props
    dispatch({
      type: actions.SET_STATE,
      payload: { current },
    })
  }

  render() {
    const { current, formSteps } = this.props
    return (
      <Steps current={current} progressDot={this.customDot}>
        {formSteps.map((x, i) => (
          <Steps.Step key={x.title} onClick={() => this.dispatchStep(i)} title={x.title} />
        ))}
      </Steps>
    )
  }
}

const mapStateToProps = (store) => ({
  current: store.step.current,
})

export default connect(mapStateToProps)(FormSteps)
