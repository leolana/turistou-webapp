import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button, Divider } from 'antd'

import ExcursionDetail from './form/1_detail'
import ExcursionPricing from './form/3_pricing'
import ExcursionTransport from './form/4_transport'

@Form.create()
class ExcursionForm extends Component {
  render() {
    const { fetching } = this.props

    return (
      <Form layout="vertical" className="customer-form" onSubmit={this.onSubmit}>
        {/* TODO: Refine all messages required field */}

        <Divider dashed>Detalhes de viagem</Divider>
        <ExcursionDetail {...this.props} />

        <Divider dashed>Valores de passagem</Divider>
        <ExcursionPricing {...this.props} />

        <Divider dashed>Transportes</Divider>
        <ExcursionTransport {...this.props} />

        <div className="form-actions">
          <Button
            type="primary"
            className="width-150 mr-4 float-right"
            htmlType="submit"
            loading={fetching}
          >
            Salvar
          </Button>
        </div>
      </Form>
    )
  }
}

export default connect()(ExcursionForm)
