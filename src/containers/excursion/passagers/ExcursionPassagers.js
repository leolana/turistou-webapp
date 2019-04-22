import React, { Component } from 'react'
import { Form, Row, Col, Select, Button } from 'antd'

import { tableData } from 'mock/customers'
// import { tableData as excursions } from 'mock/excursions'

// const excursion = tableData[0]
// const customersOptions = tableData.map(x => (<Select.Option key={x.id} value={x.id}>{x.name}</Select.Option>))

@Form.create()
class ExcursionAddPassager extends Component {
  render() {
    const { form } = this.props

    return (
      <Form layout="vertical" className="passager-form">
        <Row>
          <Col>
            <Form.Item label="Cliente">
              {form.getFieldDecorator('customer', {
                rules: [{ required: false }],
              })(
                <Select size="default" maxLength={15}>
                  {tableData.map(x => (
                    <Select.Option key={x.id} value={x.id}>
                      {x.name} - {x.city}
                    </Select.Option>
                  ))}
                </Select>,
              )}
            </Form.Item>
          </Col>
        </Row>
        <div className="form-actions">
          <Button type="primary" htmlType="submit">
            Adicionar passageiro
          </Button>
        </div>
      </Form>
    )
  }
}

export default ExcursionAddPassager
