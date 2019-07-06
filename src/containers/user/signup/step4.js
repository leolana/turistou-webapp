import React, { Component } from 'react'
import { Form, Input, Button, Radio, DatePicker, Select } from 'antd'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import MaskedInput from 'react-editmask'

import MASK from 'constants/mask'
import { typeUserOptions, corporateType, personType } from 'constants/options'

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
                  <Form layout="vertical" onSubmit={this.onSubmit}>
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
                          options={typeUserOptions}
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
                          })(<Input size="default" maxLength={200} />)}
                        </Form.Item>
                        <Form.Item label="Nome fantasia">
                          {form.getFieldDecorator('companyTradeName', {
                            rules: [
                              { required: true, message: 'Por favor, indique o nome da empresa' },
                            ],
                          })(<Input size="default" maxLength={200} />)}
                        </Form.Item>
                        <Form.Item label="CNPJ">
                          {form.getFieldDecorator('cnpj', {
                            rules: [
                              { required: true, message: 'Por favor, indique o CNPJ da empresa' },
                            ],
                          })(<MaskedInput size="default" className="ant-input" mask={MASK.cnpj} />)}
                        </Form.Item>
                      </div>
                    )}

                    {identityType === 'F' && (
                      <Form.Item label="Profissão">
                        {form.getFieldDecorator('occupation', {
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
                      })(<MaskedInput size="default" className="ant-input" mask={MASK.cadastur} />)}
                    </Form.Item>
                    <Form.Item label="Validade do cadastur">
                      {form.getFieldDecorator('cadasturExpiration', {
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
                        <Link to="/user/signup4">
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
