import React from 'react'
import { Menu, Dropdown } from 'antd'
import { connect } from 'react-redux'
import styles from './style.module.scss'

@connect(({ settings }) => ({ settings }))
class LanguageSelector extends React.Component {
  changeLang = ({ key }) => {
    const { dispatch } = this.props
    dispatch({
      type: 'settings/CHANGE_SETTING',
      payload: {
        setting: 'locale',
        value: key,
      },
    })
  }

  render() {
    const {
      settings: { locale },
    } = this.props
    const language = locale.substr(0, 2)

    const langMenu = (
      <Menu className={styles.menu} selectedKeys={[locale]} onClick={this.changeLang}>
        <Menu.Item key="pt-BR">
          <span role="img" aria-label="Português brasileiro" className="mr-2">
            🇬🇧
          </span>
          Portuguese
        </Menu.Item>
        <Menu.Item key="en-US">
          <span role="img" aria-label="English" className="mr-2">
            🇬🇧
          </span>
          English
        </Menu.Item>
        <Menu.Item key="fr-FR">
          <span role="img" aria-label="French">
            🇫🇷
          </span>
          French
        </Menu.Item>
      </Menu>
    )
    return (
      <Dropdown overlay={langMenu} trigger={['click']}>
        <div className={styles.dropdown}>
          <strong className="text-uppercase">{language}</strong>
        </div>
      </Dropdown>
    )
  }
}

export default LanguageSelector
