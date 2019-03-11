import React, { Component } from 'react'
import { Form, Input, Button, Radio, DatePicker } from 'antd'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'

import styles from './style.module.scss'

const RadioGroup = Radio.Group

@Form.create()
@connect(({ user }) => ({ user }))
class Step4 extends Component {
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

  render() {
    const typeIdOptions = [
      { value: 'F', label: 'Pessoa física' },
      { value: 'J', label: 'Pessoa jurídica' },
    ]
    const dateFormat = 'DD/MM/YYYY'
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
                    {/* TODO: start as person */}
                    <Form.Item label="Identificação">
                      {form.getFieldDecorator('identityType', {
                        rules: [
                          {
                            required: true,
                            message: 'Por favor, indique teu tipo de identificação',
                          },
                        ],
                      })(
                        <RadioGroup
                          options={typeIdOptions}
                          size="default"
                          onChange={this.onChangeIdentityType}
                        />,
                      )}
                    </Form.Item>

                    {/* TODO: hide when is person */}
                    {/* TODO: add select boxes */}
                    <div>
                      <h5>Pessoa jurídica</h5>
                      <Form.Item label="Razão social">
                        {form.getFieldDecorator('companyName', {
                          rules: [
                            {
                              required: true,
                              message: 'Por favor, indique a razão social da empresa',
                            },
                          ],
                        })(<Input size="default" />)}
                      </Form.Item>
                      <Form.Item label="Nome fantasia">
                        {form.getFieldDecorator('tradeName', {
                          rules: [
                            { required: true, message: 'Por favor, indique o nome da empresa' },
                          ],
                        })(<Input size="default" />)}
                      </Form.Item>
                      <Form.Item label="CNPJ">
                        {form.getFieldDecorator('cnpj', {
                          rules: [
                            { required: true, message: 'Por favor, indique o CNPJ da empresa' },
                          ],
                        })(<Input size="default" />)}
                      </Form.Item>
                    </div>

                    <h5>Pessoa física</h5>
                    <Form.Item label="Cadastrur">
                      {form.getFieldDecorator('cadastur', {
                        rules: [
                          { required: true, message: 'Por favor, insira teu número de cadastur' },
                        ],
                      })(<Input size="default" />)}
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
                        Próxima etapa
                      </Button>
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
