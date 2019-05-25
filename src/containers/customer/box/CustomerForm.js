import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'antd'

import FormStepButtonsActions from 'components/Step/FormStepButtonsActions'

@Form.create()
class CustomerForm extends Component {
  render() {
    const { fetching, current, formSteps } = this.props

    return (
      <Form layout="vertical" className="customer-form">
        {formSteps.map((x, i) => current === i && <x.component key={x.title} {...this.props} />)}

        <div className="form-actions">
          <FormStepButtonsActions lastStep={formSteps.length - 1} />
          <Button type="primary" className="width-150" htmlType="submit" loading={fetching}>
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

export default connect(mapStateToProps)(CustomerForm)
