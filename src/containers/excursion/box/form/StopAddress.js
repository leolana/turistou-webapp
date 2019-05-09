import React, { Component } from 'react'
import { Row, Col, Input, Button, Icon } from 'antd'
import FormItem from 'antd/lib/form/FormItem'

class StopAddress extends Component {
  render() {
    const { form, index, removeStopPoint } = this.props

    return (
      <Row>
        <Col xs={20} md={22}>
          <FormItem label="Ponto de parada">
            {form.getFieldDecorator(`stopAddress[${index}]`, {
              rules: [{ required: false }],
            })(<Input size="default" maxLength={200} />)}
          </FormItem>
        </Col>
        <Col xs={4} md={2}>
          <Button
            type="danger"
            className="button-side-field float-right"
            onClick={() => removeStopPoint(index)}
          >
            <Icon type="delete" />
          </Button>
        </Col>
      </Row>
    )
  }
}
export default StopAddress
