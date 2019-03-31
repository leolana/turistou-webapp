import React, { Component } from 'react'
import { Form, Input, Button, Radio, DatePicker, Select } from 'antd'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import MaskedInput from 'react-text-mask'

import styles from './style.module.scss'

const RadioGroup = Radio.Group
const SelectOption = Select.Option

@Form.create()
@connect(({ user }) => ({ user }))
class Step4 extends Component {
  constructor() {
    super()
    this.state = { identityType: 'F' }
  }

  onSubmit = event => {
    event.preventDefault()
    const { form, dispatch } = this.props
    console.log(form)
    form.validateFields((error, values) => {
      if (!error) {
        dispatch({
          type: 'user/COMPLETE',
          payload: values,
        })
      }
    })
  }

  onChangeIdentityType = event => {
    this.setState({ identityType: event.target.value })
  }

  render() {
    const typeIdOptions = [
      { value: 'F', label: 'Pessoa física' },
      { value: 'J', label: 'Pessoa jurídica' },
    ]
    const personType = [
      { value: 1, label: 'Guia de turismo' },
      { value: 2, label: 'Agente de turismo' },
      { value: 0, label: 'Outros' },
    ]
    const corporateType = [
      { value: 1, label: 'Microempreendedor' },
      { value: 2, label: 'Agencia de turismo' },
      { value: 0, label: 'Outros' },
    ]
    const dateFormat = 'DD/MM/YYYY'
    const { identityType } = this.state
    const {
      form,
      user: { fetching },
    } = this.props

    return (
      <div>
        <Helmet title="Sign up" />
        <div className={styles.title}>
          <h3>
            <strong>
              Por favor, complete seu cadastro para poder usufruir dos benefícios Turistou Organize
            </strong>
          </h3>
        </div>
        <div className={styles.block}>
          <div className="row">
            <div className="col-xl-12">
              <div className={styles.inner}>
                <div className={styles.form}>
                  <Form layout="vertical" hideRequiredMark onSubmit={this.onSubmit}>
                    <Form.Item label="">
                      {form.getFieldDecorator('identityType', {
                        rules: [
                          {
                            required: true,
                            message: 'Por favor, indique o tipo de identificação',
                          },
                        ],
                      })(
                        <RadioGroup
                          options={typeIdOptions}
                          size="default"
                          initialValue="F"
                          onChange={this.onChangeIdentityType}
                        />,
                      )}
                    </Form.Item>

                    {identityType === 'J' && (
                      <div>
                        <Form.Item label="Tipo de empresa">
                          {form.getFieldDecorator('companyType', {
                            rules: [
                              {
                                required: true,
                                message: 'Por favor, selecione um tipo de empresa',
                              },
                            ],
                          })(
                            <Select>
                              {corporateType.map(opt => (
                                <SelectOption key={opt.value} value={opt.value}>
                                  {opt.label}
                                </SelectOption>
                              ))}
                            </Select>,
                          )}
                        </Form.Item>
                        <Form.Item label="Razão social">
                          {form.getFieldDecorator('companyName', {
                            rules: [
                              {
                                required: true,
                                message: 'Por favor, indique a razão social da empresa',
                              },
                            ],
                          })(<Input size="default" maxLength="200" />)}
                        </Form.Item>
                        <Form.Item label="Nome fantasia">
                          {form.getFieldDecorator('tradeName', {
                            rules: [
                              { required: true, message: 'Por favor, indique o nome da empresa' },
                            ],
                          })(<Input size="default" maxLength="200" />)}
                        </Form.Item>
                        <Form.Item label="CNPJ">
                          {form.getFieldDecorator('cnpj', {
                            rules: [
                              { required: true, message: 'Por favor, indique o CNPJ da empresa' },
                            ],
                          })(
                            <MaskedInput
                              size="default"
                              className="ant-input"
                              mask={[
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
                                '/',
                                /\d/,
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
                      </div>
                    )}

                    {identityType === 'F' && (
                      <Form.Item label="Profissão">
                        {form.getFieldDecorator('personType', {
                          rules: [
                            { required: true, message: 'Por favor, selecione um tipo de trabalho' },
                          ],
                        })(
                          <Select>
                            {personType.map(opt => (
                              <SelectOption key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectOption>
                            ))}
                          </Select>,
                        )}
                      </Form.Item>
                    )}

                    <Form.Item label="Cadastrur">
                      {form.getFieldDecorator('cadastur', {
                        rules: [
                          { required: true, message: 'Por favor, insira teu número de cadastur' },
                        ],
                      })(
                        <MaskedInput
                          size="default"
                          className="ant-input"
                          mask={[
                            /\d/,
                            /\d/,
                            '.',
                            /\d/,
                            /\d/,
                            /\d/,
                            /\d/,
                            /\d/,
                            /\d/,
                            '.',
                            /\d/,
                            /\d/,
                            '-',
                            /\d/,
                          ]}
                        />,
                      )}
                    </Form.Item>
                    <Form.Item label="Validade do cadastur">
                      {form.getFieldDecorator('cadasturDue', {
                        rules: [
                          { required: true, message: 'Por favor, indique a validade da licença' },
                        ],
                      })(<DatePicker size="default" format={dateFormat} />)}
                      {/* TODO: start DatePicker in year? view */}
                    </Form.Item>
                    <div className="mb-3">
                      <Button
                        type="primary"
                        className="width-150 mr-4"
                        htmlType="submit"
                        loading={fetching}
                      >
                        Salvar
                      </Button>
                      {/* <Button
                        type="default"
                        className="width-150 mr-4"
                        loading={fetching}
                      >
                        <Link to="/user/completeStep4">
                          Próxima etapa
                        </Link>
                      </Button> */}
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Step4
