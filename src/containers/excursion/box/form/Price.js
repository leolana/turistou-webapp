import React, { Component } from 'react'
import { Row, Col, InputNumber, Input, Switch, Button, Icon, Divider } from 'antd'
import FormItem from 'antd/lib/form/FormItem'

class Price extends Component {
  render() {
    const { form, index, removePrice } = this.props

    return (
      <div>
        <Row>
          <Col xs={24} sm={16} md={8}>
            <FormItem label="Tipo de passagem">
              {form.getFieldDecorator(`ticketDescription[${index}]`, {
                rules: [{ required: false }],
              })(<Input size="default" maxLength={30} />)}
            </FormItem>
          </Col>
          <Col xs={24} sm={8} md={4}>
            <FormItem label="Preço">
              {form.getFieldDecorator(`ticketPrice[${index}]`, {
                rules: [{ required: false }],
              })(<InputNumber size="default" maxLength={5} />)}
            </FormItem>
          </Col>

          <Col xs={5} sm={3} md={2}>
            <FormItem label="De">
              {form.getFieldDecorator(`isFrom[${index}]`, {
                rules: [{ required: false }],
              })(<Switch size="small" />)}
            </FormItem>
          </Col>
          <Col xs={19} sm={7} md={3}>
            <FormItem label="Idade">
              {form.getFieldDecorator(`ageInital[${index}]`, {
                rules: [{ required: false }],
              })(<InputNumber onClick={this.handleAbleFromAge} size="default" maxLength={6} />)}
            </FormItem>
          </Col>
          <Col xs={5} sm={{ span: 3, offset: 1 }} md={{ span: 2, offset: 0 }}>
            <FormItem label="até">
              {form.getFieldDecorator(`ageFinal[${index}]`, {
                rules: [{ required: false }],
              })(<Switch size="small" />)}
            </FormItem>
          </Col>
          <Col xs={15} sm={7} md={3}>
            <FormItem label="Idade">
              {form.getFieldDecorator(`untilAge[${index}]`, {
                rules: [{ required: false }],
              })(<InputNumber size="default" maxLength={3} />)}
            </FormItem>
          </Col>
          <Col xs={4} sm={3} md={2}>
            <Button type="danger" className="button-side-field" onClick={() => removePrice(index)}>
              <Icon type="delete" />
            </Button>
          </Col>
        </Row>
        <Divider dashed />
      </div>
    )
  }
}
export default Price
