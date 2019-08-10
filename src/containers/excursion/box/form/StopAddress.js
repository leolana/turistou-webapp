import React, { Component } from 'react'
import { Row, Col, Input, Button } from 'antd'
import FormItem from 'antd/lib/form/FormItem'

class StopAddress extends Component {
  render() {
    const { form, index, removeStopPoint } = this.props

    return (
      <Row>
        <Col xs={20} md={22}>
          <FormItem label="Ponto de parada">
            {form.getFieldDecorator(`stopPoint[${index}]`, {
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
            <i className="fa fa-trash" />
          </Button>
        </Col>
      </Row>
    )
  }
}
export default StopAddress
