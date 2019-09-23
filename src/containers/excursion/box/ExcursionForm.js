import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form } from 'antd'

import FormStepButtonsActions from 'components/Step/FormStepButtonsActions'
import SkeletonForm from 'components/SkeletonForm/SkeletonForm'

@Form.create()
class ExcursionForm extends Component {
  constructor() {
    super()

    this.state = {
      isLoading: true,
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isLoading: false })
    }, 1500)
  }

  onSubmit = e => {
    e.preventDefault()
    // eslint-disable-next-line react/destructuring-assignment
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }

  render() {
    const { current, formSteps, form } = this.props
    const { isLoading } = this.state

    return (
      <SkeletonForm isLoading={isLoading}>
        <Form layout="vertical" className="customer-form" onSubmit={this.onSubmit}>
          {formSteps.map((x, i) => (
            <x.component
              key={x.title}
              form={form}
              style={{ display: current === i ? 'block' : 'none' }}
            />
          ))}

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
