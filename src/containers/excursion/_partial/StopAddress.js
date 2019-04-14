import React, { Component } from 'react'
import { Row, Col, Input } from 'antd'
import FormItem from 'antd/lib/form/FormItem'

class StopAddress extends Component {
  render() {
    const { form } = this.props

    return (
      <Row>
        <Col xs={24}>
          <FormItem label="Ponto de parada">
            {form.getFieldDecorator('stopAddress', {
              rules: [{ required: false }],
            })(<Input size="default" maxLength="200" />)}
          </FormItem>
        </Col>
      </Row>
    )
  }
}
export default StopAddress
