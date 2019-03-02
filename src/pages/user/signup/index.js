import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import styles from './style.module.scss'

@Form.create()
@connect(({ user }) => ({ user }))
class Signup extends Component {
  onSubmit = event => {
    event.preventDefault()
    const { form, dispatch } = this.props
    console.log(form)
    form.validateFields((error, values) => {
      if (!error) {
        dispatch({
          type: 'user/SIGNUP',
          payload: values,
        })
      }
    })
  }

  render() {
    const {
      form,
      user: { fetching },
    } = this.props
    return (
      <div>
        <Helmet title="Sign up" />
        <div className={styles.title}>
          <h1>
            <strong>Faça seu cadastro na Turistou</strong>
          </h1>
          <p>
            E seja um agente moderno.
            <br />
            Mantenha a agenda de excursões organizadas em um só lugar e acessível de onde você
            estiver.
            <br />
            Tenha o controle dos pagamentos de seus clientes
          </p>
        </div>
        <div className={styles.block}>
          <div className="row">
            <div className="col-xl-12">
              <div className={styles.inner}>
                <div className={styles.form}>
                  <Form layout="vertical" hideRequiredMark onSubmit={this.onSubmit}>
                    <Form.Item label="Nome">
                      {form.getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Por favor, insira teu nome' }],
                      })(<Input size="default" />)}
                    </Form.Item>
                    <Form.Item label="Sobrenome">
                      {form.getFieldDecorator('lastname', {
                        rules: [{ required: true, message: 'Por favor, insira teu sobrenome' }],
                      })(<Input size="default" />)}
                    </Form.Item>
                    <Form.Item label="Email">
                      {form.getFieldDecorator('email', {
                        rules: [
                          { required: true, message: 'Por favor, insira um endereço de e-mail' },
                        ],
                      })(<Input size="default" type="email" />)}
                    </Form.Item>
                    <Form.Item label="Celular">
                      {form.getFieldDecorator('cellphone', {
                        rules: [{ required: false }],
                      })(<Input size="default" />)}
                    </Form.Item>
                    <Form.Item label="Senha">
                      {form.getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Por favor, insira uma senha' }],
                      })(<Input size="default" type="password" />)}
                    </Form.Item>
                    <Form.Item label="Confirmar senha">
                      {form.getFieldDecorator('passwordConfirm', {
                        rules: [{ required: true, message: 'Por favor, confirme a senha' }],
                      })(<Input size="default" type="password" />)}
                    </Form.Item>
                    <div className="mb-3">
                      <Button
                        type="primary"
                        className="width-150 mr-4"
                        htmlType="submit"
                        loading={fetching}
                      >
                        Cadastrar
                      </Button>
                      <Link to="/user/login" className="utils__link--blue utils__link--underlined">
                        Já sou cadastrado
                      </Link>
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

export default Signup
