import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form } from 'antd'

import FormStepButtonsActions from 'components/Step/FormStepButtonsActions'

@Form.create()
class ExcursionForm extends Component {
  render() {
    const { current, formSteps } = this.props

    return (
      <Form layout="vertical" className="customer-form" onSubmit={this.onSubmit}>
        {formSteps.map((x, i) => current === i && <x.component key={x.title} {...this.props} />)}

        <div className="form-actions">
          <FormStepButtonsActions lastStep={formSteps.length - 1} />
        </div>
      </Form>
    )
  }
}

const mapStateToProps = store => ({
  current: store.step.current,
})

export default connect(mapStateToProps)(ExcursionForm)