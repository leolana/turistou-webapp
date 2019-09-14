import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form } from 'antd'

import FormStepButtonsActions from 'components/Step/FormStepButtonsActions'
import SkeletonForm from 'components/SkeletonForm/SkeletonForm'

@Form.create()
class ExcursionForm extends Component {
  constructor() {
    super()

    this.state({
      isLoading: true,
    })
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isLoading: false })
    }, 1500)
  }

  render() {
    const { current, formSteps } = this.props
    const { isLoading } = this.state

    return (
      <SkeletonForm isLoading={isLoading}>
        <Form layout="vertical" className="customer-form" onSubmit={this.onSubmit}>
          {formSteps.map((x, i) => current === i && <x.component key={x.title} {...this.props} />)}

          <div className="form-actions">
            <FormStepButtonsActions lastStep={formSteps.length - 1} />
          </div>
        </Form>
      </SkeletonForm>
    )
  }
}

const mapStateToProps = store => ({
  current: store.step.current,
})

export default connect(mapStateToProps)(ExcursionForm)
