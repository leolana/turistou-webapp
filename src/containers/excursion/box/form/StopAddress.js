import React from 'react'
import { Row, Col, Input, Button } from 'antd'
import FormItem from 'antd/lib/form/FormItem'

const StopAddress = ({ form, removeStopPoint, data: { id, stopPoint, key } }) => {
  form.getFieldDecorator(`stoppingPoints[${key}].id`, { initialValue: id })

  return (
    <Row>
      <Col xs={20} md={22}>
        <FormItem label="Ponto de parada">
          {form.getFieldDecorator(`stoppingPoints[${key}].stopPoint`, {
            initialValue: stopPoint,
            rules: [{ required: false }],
          })(<Input size="default" maxLength={200} />)}
        </FormItem>
      </Col>
      <Col xs={4} md={2}>
        <Button
          type="danger"
          className="button-side-field float-right"
          onClick={() => removeStopPoint(key)}
        >
          <i className="fa fa-trash" />
        </Button>
      </Col>
    </Row>
  )
}
export default StopAddress
