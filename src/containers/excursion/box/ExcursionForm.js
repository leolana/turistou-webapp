import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'antd'

import StepButtonsActions from 'components/Step/buttons'

import ExcursionDetail from './form/ExcursionDetail'
import ExcursionStopPoint from './form/ExcursionStopPoint'
import ExcursionPricing from './form/ExcursionPricing'
import ExcursionTransport from './form/ExcursionTransport'

@Form.create()
class ExcursionForm extends Component {
  render() {
    const { fetching, current: step } = this.props

    return (
      <Form layout="vertical" className="customer-form" onSubmit={this.onSubmit}>
        {/* TODO: Refine all messages required field */}
        {step === 1 && <ExcursionDetail {...this.props} />}
        {step === 2 && <ExcursionStopPoint {...this.props} />}
        {step === 3 && <ExcursionPricing {...this.props} />}
        {step === 4 && <ExcursionTransport {...this.props} />}

        <div className="form-actions">
          <StepButtonsActions lastStep={4} />
          <Button type="primary" htmlType="submit" loading={fetching}>
            Salvar
          </Button>
        </div>
      </Form>
    )
  }
}

const mapStateToProps = store => ({
  current: store.step.current,
})

export default connect(mapStateToProps)(ExcursionForm)
