import React, { Component } from 'react'
import { Form, Input, DatePicker, Button, Row, Col, InputNumber, Divider } from 'antd'
import MaskedInput from 'react-editmask'
import RadioGroup from 'antd/lib/radio/group'
import MASK from 'constants/mask'
import { genderOptions } from 'constants/options'

@Form.create()
class CustomerForm extends Component {
  render() {
    const { form, fetching } = this.props
    const dateFormat = 'DD/MM/YYYY'
    return (
      <Form layout="vertical" className="customer-form" onSubmit={this.onSubmit}>
        {/* TODO: Refine all messages required field */}
        {/* TODO: djust layout form */}
        <Divider dashed>Dados pessoais</Divider>
        <Row>
          <Col span={24}>
            <Form.Item label="Nome">
              {form.getFieldDecorator('name', {
                rules: [{ required: true, message: 'Por favor, insira teu nome' }],
              })(<Input size="default" maxLength={15} />)}
            </Form.Item>
          </Col>

          <Col span={4}>
            <Form.Item label="CPF">
              {form.getFieldDecorator('cpf', {
                rules: [{ required: false }],
              })(<MaskedInput className="ant-input" mask={MASK.cpf} />)}
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item label="UF emissor">
              {/* TODO: patterns for field names?? underscore or camelCase? */}
              {/* TODO: input only letters and force to uppdercase */}
              {form.getFieldDecorator('uf_cpf', {
                rules: [{ required: false }],
              })(<Input size="default" maxLength={2} />)}
            </Form.Item>
          </Col>

          <Col span={4}>
            <Form.Item label="RG">
              {form.getFieldDecorator('rg', {
                rules: [{ required: false }],
              })(<MaskedInput className="ant-input" mask={MASK.rg} />)}
            </Form.Item>
          </Col>
          {/* TODO: validation for age?? */}
          <Col span={4}>
            <Form.Item label="Data de nascimento">
              {form.getFieldDecorator('birthdate', {
                rules: [{ required: false }],
              })(<DatePicker size="default" format={dateFormat} />)}
              {/* TODO: translate DatePicker */}
              {/* TODO: start DatePicker in year view */}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Gênero">
              {form.getFieldDecorator('gender', {
                rules: [{ required: false }],
              })(<RadioGroup options={genderOptions} size="default" />)}
            </Form.Item>
          </Col>
        </Row>

        <Divider dashed>Endereço</Divider>
        <Row>
          <Col span={12}>
            <Form.Item label="Logradouro">
              {form.getFieldDecorator('address', {
                rules: [{ required: false }],
              })(<Input size="default" maxLength={150} />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Bairro">
              {form.getFieldDecorator('area', {
                rules: [{ required: false }],
              })(<Input size="default" maxLength={150} />)}
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="Número">
              {form.getFieldDecorator('number', {
                rules: [{ required: false }],
              })(<InputNumber size="default" maxLength={7} />)}
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="Complemento">
              {form.getFieldDecorator('complement', {
                rules: [{ required: false }],
              })(<Input size="default" maxLength={20} />)}
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="CEP">
              {form.getFieldDecorator('zipcode', {
                rules: [{ required: false }],
              })(<MaskedInput className="ant-input" mask={MASK.zipcode} />)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Cidade">
              {form.getFieldDecorator('city', {
                rules: [{ required: false }],
              })(<Input size="default" maxLength={150} />)}
            </Form.Item>
          </Col>
          <Col span={2}>
            {/* TODO: uppercas */}
            <Form.Item label="UF">
              {form.getFieldDecorator('fu', {
                rules: [{ required: false }],
              })(<Input size="default" maxLength={2} />)}
            </Form.Item>
          </Col>
        </Row>

        <Divider dashed>Contato</Divider>
        <Row>
          <Col span={4}>
            <Form.Item label="Celular">
              {form.getFieldDecorator('cellphone', {
                rules: [{ required: true, message: 'Por favor, insira o número celular' }],
              })(<MaskedInput className="ant-input" mask={MASK.cellphone} />)}
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="Telefone">
              {form.getFieldDecorator('telephone', {
                rules: [{ required: false }],
              })(<MaskedInput className="ant-input" mask={MASK.telephone} />)}
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item label="E-mail">
              {form.getFieldDecorator('email', {
                rules: [{ required: true, message: 'Por favor, insira um endereço de e-mail' }],
              })(<Input size="default" type="email" maxLength={255} />)}
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Profissão">
              {form.getFieldDecorator('occupation', {
                rules: [{ required: false }],
              })(<Input size="default" maxLength={30} />)}
            </Form.Item>
          </Col>
        </Row>

        <Divider dashed>Emergência</Divider>
        <Row>
          <Col span={4}>
            <Form.Item label="Plano de saúde">
              {form.getFieldDecorator('healthPlan', {
                rules: [{ required: false }],
              })(<Input size="default" maxLength={30} />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Alergia a medicamentos">
              {form.getFieldDecorator('allergy', {
                rules: [{ required: false }],
              })(<Input size="default" maxLength={200} />)}
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Nome do contato de emergência">
              {form.getFieldDecorator('emergencyName', {
                rules: [{ required: false }],
              })(<Input size="default" maxLength={30} />)}
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Telefone do contato de emergência">
              {form.getFieldDecorator('emergencyCellphone', {
                rules: [{ required: false }],
              })(<MaskedInput className="ant-input" mask={MASK.phone} />)}
            </Form.Item>
          </Col>
        </Row>

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

export default CustomerForm