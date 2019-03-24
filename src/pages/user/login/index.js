import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import styles from './style.module.scss'

@Form.create()
@connect(({ user }) => ({ user }))
class Login extends Component {
  onSubmit = event => {
    event.preventDefault()
    const { form, dispatch } = this.props
    form.validateFields((error, values) => {
      if (!error) {
        dispatch({
          type: 'user/LOGIN',
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
        <Helmet title="Login" />
        <div className={styles.title}>
          <h1>
            <strong>Bem-vindo a Turistou Organize</strong>
          </h1>
          <p>
            Faça o login para gerenciar suas excursões.
            <br />
            Desfrute da ferramenta que auxilia e otimiza seu trabalho.
            <br />
            O Alex deve escrever textos melhores do que os meus para por aqui =p.
            <br />
            Conte conosco e ajude-nos a melhorar:{' '}
            <Link className="utils__link--blue" to="/faq">
              FAQ
            </Link>
          </p>
        </div>
        <div className={styles.block}>
          <div className="row">
            <div className="col-xl-12">
              <div className={styles.inner}>
                <div className={styles.form}>
                  <h4 className="text-uppercase">
                    <strong>Log in</strong>
                  </h4>
                  <div>
                    Ainda não é registrado?
                    <Link
                      to="/user/signup"
                      className="utils__link--blue utils__link--underlined ml-2"
                    >
                      Registre-se
                    </Link>
                  </div>
                  <br />
                  <Form layout="vertical" hideRequiredMark onSubmit={this.onSubmit}>
                    <Form.Item label="Email">
                      {form.getFieldDecorator('email', {
                        initialValue: 'admin@mediatec.org',
                        rules: [{ required: true, message: 'Please input your e-mail address' }],
                      })(<Input size="default" />)}
                    </Form.Item>
                    <Form.Item label="Password">
                      {form.getFieldDecorator('password', {
                        initialValue: 'cleanui',
                        rules: [{ required: true, message: 'Please input your password' }],
                      })(<Input size="default" type="password" />)}
                    </Form.Item>
                    <div className="mb-2">
                      <Link to="/user/forgot" className="utils__link--blue utils__link--underlined">
                        Esqueci a senha
                      </Link>
                    </div>
                    <div className="form-actions">
                      <Button
                        type="primary"
                        className="width-150 mr-4"
                        htmlType="submit"
                        loading={fetching}
                      >
                        Entrar
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

export default Login
