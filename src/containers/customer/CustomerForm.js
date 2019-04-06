import React, { Component } from 'react'
import { Form, Input, DatePicker, Button, Row, Col, InputNumber } from 'antd'
import MaskedInput from 'react-text-mask'
import RadioGroup from 'antd/lib/radio/group'

@Form.create()
class CustomerForm extends Component {
  render() {
    const { form, fetching } = this.props
    const dateFormat = 'DD/MM/YYYY'
    const genderOptions = [
      { value: 'F', label: 'Feminino' },
      { value: 'M', label: 'Masculino' },
      { value: '-', label: 'Outro' },
    ]
    return (
      <Form layout="vertical" className="customer-form" onSubmit={this.onSubmit}>
        {/* TODO: Refine all messages required field */}
        {/* TODO: djust layout form */}
        <section className="code-box-meta markdown">
          <div className="code-box-title">Dados pessoais</div>
          <Row>
            <Col span={24}>
              <Form.Item label="Nome">
                {form.getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Por favor, insira teu nome' }],
                })(<Input size="default" maxLength="15" />)}
              </Form.Item>
            </Col>

            <Col span={4}>
              <Form.Item label="CPF">
                {form.getFieldDecorator('cpf', {
                  rules: [{ required: false }],
                })(
                  <MaskedInput
                    className="ant-input"
                    mask={[
                      /\d/,
                      /\d/,
                      /\d/,
                      '.',
                      /\d/,
                      /\d/,
                      /\d/,
                      '.',
                      /\d/,
                      /\d/,
                      /\d/,
                      '-',
                      /\d/,
                      /\d/,
                    ]}
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label="UF emissor">
                {/* TODO: patterns for field names?? underscore or camelCase? */}
                {/* TODO: input only letters and force to uppdercase */}
                {form.getFieldDecorator('uf_cpf', {
                  rules: [{ required: false }],
                })(<Input size="default" maxLength="2" />)}
              </Form.Item>
            </Col>

            <Col span={4}>
              <Form.Item label="RG">
                {form.getFieldDecorator('rg', {
                  rules: [{ required: false }],
                })(
                  <MaskedInput
                    className="ant-input"
                    mask={[/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/]}
                  />,
                )}
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
        </section>

        <section className="code-box-meta markdown">
          <div className="code-box-title">Endereço</div>
          <Row>
            <Col span={12}>
              <Form.Item label="Logradouro">
                {form.getFieldDecorator('address', {
                  rules: [{ required: false }],
                })(<Input size="default" maxLength="150" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Bairro">
                {form.getFieldDecorator('area', {
                  rules: [{ required: false }],
                })(<Input size="default" maxLength="150" />)}
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="Número">
                {form.getFieldDecorator('number', {
                  rules: [{ required: false }],
                })(<InputNumber size="default" maxLength="7" />)}
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label="Complemento">
                {form.getFieldDecorator('complement', {
                  rules: [{ required: false }],
                })(<Input size="default" maxLength="20" />)}
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="CEP">
                {form.getFieldDecorator('zipcode', {
                  rules: [{ required: false }],
                })(
                  <MaskedInput
                    className="ant-input"
                    mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Cidade">
                {form.getFieldDecorator('city', {
                  rules: [{ required: false }],
                })(<Input size="default" maxLength="150" />)}
              </Form.Item>
            </Col>
            <Col span={2}>
              <Form.Item label="UF">
                {form.getFieldDecorator('fu', {
                  rules: [{ required: false }],
                })(<Input size="default" maxLength="2" />)}
              </Form.Item>
            </Col>
          </Row>
        </section>

        <section className="code-box-meta markdown">
          <div className="code-box-title">Contato</div>
          <Row>
            <Col span={4}>
              <Form.Item label="Celular">
                {form.getFieldDecorator('cellphone', {
                  rules: [{ required: true, message: 'Por favor, insira o número celular' }],
                })(
                  <MaskedInput
                    className="ant-input"
                    mask={[
                      '(',
                      /[1-9]/,
                      /[1-9]/,
                      ')',
                      ' ',
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                      '-',
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                    ]}
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="Telefone">
                {form.getFieldDecorator('telephone', {
                  rules: [{ required: false }],
                })(
                  <MaskedInput
                    className="ant-input"
                    mask={[
                      '(',
                      /[1-9]/,
                      /[1-9]/,
                      ')',
                      ' ',
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                      '-',
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                    ]}
                  />,
                )}
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item label="E-mail">
                {form.getFieldDecorator('email', {
                  rules: [{ required: true, message: 'Por favor, insira um endereço de e-mail' }],
                })(<Input size="default" type="email" maxLength="255" />)}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Profissão">
                {form.getFieldDecorator('occupation', {
                  rules: [{ required: false }],
                })(<Input size="default" maxLength="30" />)}
              </Form.Item>
            </Col>
          </Row>
        </section>

        <section className="code-box-meta markdown">
          <div className="code-box-title">Emergência</div>
          <Row>
            <Col span={4}>
              <Form.Item label="Plano de saúde">
                {form.getFieldDecorator('healthPlan', {
                  rules: [{ required: false }],
                })(<Input size="default" maxLength="30" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Alergia a medicamentos">
                {form.getFieldDecorator('allergy', {
                  rules: [{ required: false }],
                })(<Input size="default" maxLength="200" />)}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Nome do contato de emergência">
                {form.getFieldDecorator('emergencyName', {
                  rules: [{ required: false }],
                })(<Input size="default" maxLength="30" />)}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Celular do contato de emergência">
                {form.getFieldDecorator('emergencyCellphone', {
                  rules: [{ required: false }],
                })(
                  <MaskedInput
                    className="ant-input"
                    mask={[
                      '(',
                      /[1-9]/,
                      /[1-9]/,
                      ')',
                      ' ',
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                      '-',
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                    ]}
                  />,
                )}
              </Form.Item>
            </Col>
          </Row>
        </section>

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
