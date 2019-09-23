import React, { Component } from 'react'
import { Button } from 'antd'
import { connect } from 'react-redux'

import actions from 'redux/step/actions'

class FormStepButtonsActions extends Component {
  constructor(props) {
    super(props)

    this.dispatchStep = this.dispatchStep.bind(this)
  }

  dispatchStep(current) {
    const { dispatch } = this.props
    dispatch({
      type: actions.SET_STATE,
      payload: { current },
    })
  }

  render() {
    const { current, lastStep } = this.props
    return (
      <div>
        <Button onClick={() => this.dispatchStep(current - 1)} disabled={current === 0}>
          Voltar
        </Button>
        {current < lastStep && (
          <Button type="primary" onClick={() => this.dispatchStep(current + 1)}>
            Avançar
          </Button>
        )}
        {current === lastStep && (
          <Button type="primary" ghost htmlType="submit">
            Salvar e adicionar novo
          </Button>
        )}
        {current === lastStep && (
          <Button type="primary" htmlType="submit">
            Salvar
          </Button>
        )}
      </div>
    )
  }
}

const mapStateToProps = store => ({
  current: store.step.current,
})

export default connect(mapStateToProps)(FormStepButtonsActions)
