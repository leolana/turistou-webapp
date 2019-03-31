import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Radio, DatePicker } from 'antd'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import MaskedInput from 'react-text-mask'

import styles from './style.module.scss'

const RadioGroup = Radio.Group

@Form.create()
@connect(({ user }) => ({ user }))
class Step2 extends Component {
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
    const sexOptions = [{ value: 'F', label: 'Feminino' }, { value: 'M', label: 'Masculino' }]
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
                    <Form.Item label="CPF">
                      {form.getFieldDecorator('cpf', {
                        rules: [{ required: true, message: 'Por favor, insira teu CPF' }],
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
                    <Form.Item label="Sexo">
                      {form.getFieldDecorator('sex', {
                        rules: [{ required: false }],
                      })(<RadioGroup options={sexOptions} size="default" />)}
                    </Form.Item>
                    <Form.Item label="Data de nascimento">
                      {form.getFieldDecorator('birthdate', {
                        rules: [
                          {
                            required: true,
                            message: 'Por favor, selecione uma data de nascimento',
                          },
                        ],
                      })(<DatePicker size="default" format={dateFormat} />)}
                      {/* TODO: translate DatePicker */}
                      {/* TODO: start DatePicker in year view */}
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
                      <Button type="default" className="width-150 mr-4" loading={fetching}>
                        <Link to="/user/completeStep3">Próxima etapa</Link>
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

export default Step2
