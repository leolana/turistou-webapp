import React, { useEffect } from 'react'
import { Row, Col, InputNumber, Input, Switch, Button, Divider } from 'antd'
import FormItem from 'antd/lib/form/FormItem'

const Price = (props) => {
  const { form, removePrice, data, index } = props
  const { key, id, description, price, ageInitial, ageFinal } = data

  useEffect(() => {
    form.getFieldDecorator(`ticketPrices[${index}].id`, { initialValue: id })
  }, [form, id, index])

  return (
    <div>
      <Row>
        <Col xs={24} sm={16} md={8}>
          <FormItem label="Tipo de passagem">
            {form.getFieldDecorator(`ticketPrices[${index}].description`, {
              initialValue: description,
              rules: [{ required: false }],
            })(<Input size="default" maxLength={30} />)}
          </FormItem>
        </Col>
        <Col xs={24} sm={8} md={4}>
          <FormItem label="Preço">
            {form.getFieldDecorator(`ticketPrices[${index}].price`, {
              initialValue: price,
              rules: [{ required: false }],
            })(<InputNumber size="default" maxLength={5} />)}
          </FormItem>
        </Col>

        <Col xs={5} sm={3} md={2}>
          <FormItem label="De">
            {form.getFieldDecorator(`ticketPrices[${index}].isFrom`, {
              valuePropName: 'checked',
              initialValue: !!ageInitial,
              rules: [{ required: false }],
            })(<Switch size="small" />)}
          </FormItem>
        </Col>
        <Col xs={19} sm={7} md={3}>
          <FormItem label="Idade">
            {form.getFieldDecorator(`ticketPrices[${index}].ageInitial`, {
              initialValue: ageInitial,
              rules: [{ required: false }],
            })(<InputNumber size="default" maxLength={6} />)}
          </FormItem>
        </Col>
        <Col xs={5} sm={{ span: 3, offset: 1 }} md={{ span: 2, offset: 0 }}>
          <FormItem label="até">
            {form.getFieldDecorator(`ticketPrices[${index}].untilAge`, {
              valuePropName: 'checked',
              initialValue: !!ageFinal,
              rules: [{ required: false }],
            })(<Switch size="small" />)}
          </FormItem>
        </Col>
        <Col xs={15} sm={7} md={3}>
          <FormItem label="Idade">
            {form.getFieldDecorator(`ticketPrices[${index}].ageFinal`, {
              initialValue: ageFinal,
              rules: [{ required: false }],
            })(<InputNumber size="default" maxLength={3} />)}
          </FormItem>
        </Col>
        <Col xs={4} sm={3} md={2}>
          <Button type="danger" className="button-side-field" onClick={() => removePrice(key)}>
            <i className="fa fa-trash" />
          </Button>
        </Col>
      </Row>
      <Divider dashed />
    </div>
  )
}
export default Price
