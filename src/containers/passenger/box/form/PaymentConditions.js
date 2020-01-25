import React, { Component } from 'react'
import { Row, Col, Form, Select, InputNumber, DatePicker, Button, Modal, Divider } from 'antd'

import { paymentType } from 'constants/options'

const dateFormat = 'DD/MM/YYYY'
const MAX_INSTALLMENT = 10

const Installment = ({ form, index }) => {
  const price = form.getFieldValue(`paymentValue[${index}]`)

  return (
    <>
      <Col xs={24} sm={12} lg={7}>
        <Form.Item label="Parcelas">
          {/* TODO: send installment value */}
          {form.getFieldDecorator(`installmentQuantity[${index}]`, {
            rules: [{ required: false }],
          })(
            <Select size="default">
              {[...Array(MAX_INSTALLMENT).keys()]
                .map(x => x + 1)
                .map(x => (
                  <Select.Option key={x} value={x}>
                    {x === 1 ? (
                      'À vista'
                    ) : (
                      <>
                        {x}&times; ({(price / x).toFixed(2)})
                      </>
                    )}
                  </Select.Option>
                ))}
            </Select>,
          )}
        </Form.Item>
      </Col>
      <Col xs={18} sm={10} lg={5}>
        <Form.Item label="Primeira parcela">
          {form.getFieldDecorator(`paymentFirstDue[${index}]`, {
            rules: [{ required: false }],
          })(<DatePicker size="default" format={dateFormat} />)}
        </Form.Item>
      </Col>
    </>
  )
}

class PaymentConditions extends Component {
  constructor() {
    super()

    this.state = { isInstallable: false }

    this.handleChangePaymentCondition = this.handleChangePaymentCondition.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  getSelectedPrice() {
    const {
      form,
      excursion: { ticketPrices, ticketPriceDefault },
    } = this.props
    const ticketPriceId = form.getFieldValue('ticketPriceId')
    const price = ticketPriceId
      ? ticketPrices.find(x => x.id === ticketPriceId).price
      : ticketPriceDefault
    return price
  }

  handleRemove(id) {
    const { removePayment } = this.props
    Modal.error({
      title: 'Deseja remover este pagamento?',
      content: 'Esta ação removerá o pagamento do histórico e não poderá ser desfeita!',
      okText: 'Sim',
      okType: 'danger',
      onOk: () => removePayment(id),
      okCancel: true,
      cancelText: 'Não',
    })
  }

  handleChangePaymentCondition(value) {
    // TODO: ???
    const filter = paymentType.filter(x => x.value === value)
    console.log('filter', filter)
    if (filter.length) {
      const { isInstallable } = filter[0]
      this.setState({ isInstallable })
    }
  }

  render() {
    const { form, index } = this.props
    const { isInstallable } = this.state

    return (
      <Row>
        <Col xs={24} sm={12} lg={6}>
          <Form.Item label="Forma de pagamento">
            {form.getFieldDecorator(`paymentConditions[${index}]`, {
              rules: [{ required: false }],
            })(
              <Select size="default" onChange={this.handleChangePaymentCondition}>
                {paymentType.map(x => (
                  <Select.Option key={x.value} value={x.value} title={x.label}>
                    {x.label}
                  </Select.Option>
                ))}
              </Select>,
            )}
          </Form.Item>
        </Col>
        <Col xs={isInstallable ? 24 : 18} sm={isInstallable ? 12 : 10} lg={4}>
          <Form.Item label="Valor">
            {form.getFieldDecorator(`paymentValue[${index}]`, {
              rules: [{ required: false }],
            })(<InputNumber precision={2} decimalSeparator="," />)}
          </Form.Item>
        </Col>

        {isInstallable && <Installment {...{ form, index }} />}

        <Col className="float-right" xs={6} sm={2} lg={2}>
          <Button
            type="danger"
            className="button-side-field float-right mr-0"
            onClick={() => this.handleRemove(index)}
          >
            <i className="fa fa-trash" />
          </Button>
        </Col>

        <Divider dashed />
      </Row>
    )
  }
}

export default PaymentConditions
