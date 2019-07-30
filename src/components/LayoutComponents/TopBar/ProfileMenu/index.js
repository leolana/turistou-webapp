import React from 'react'
import { connect } from 'react-redux'
import { Menu, Dropdown, Avatar, Badge } from 'antd'
import { FormattedMessage } from 'react-intl'
import { getIdToken } from 'core/auth'
import JwtDecode from 'jwt-decode'
import styles from './style.module.scss'

@connect(({ user }) => ({ user }))
class ProfileMenu extends React.Component {
  state = {
    count: 0,
  }

  logout = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'user/LOGOUT',
    })
  }

  render() {
    const { user } = this.props
    const { count } = this.state
    const token = getIdToken()
    const info = JwtDecode(token)
    console.log('\n\ninfo:', info)
    const { nickname, email } = JwtDecode(token)

    const menu = (
      <Menu selectable={false}>
        <Menu.Item>
          <strong>
            <FormattedMessage id="topBar.profileMenu.hello" />, {nickname || 'Anonymous'}
          </strong>
          {/* <div>
            <strong className="mr-1">
              <FormattedMessage id="topBar.profileMenu.billingPlan" />:{' '}
            </strong>
            Professional
          </div> */}
          {/* <div>
            <strong>
              <FormattedMessage id="topBar.profileMenu.role" />:{' '}
            </strong>
            {user.role}
          </div> */}
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <div>
            <strong>
              <FormattedMessage id="topBar.profileMenu.email" />:{email || ''}
            </strong>
            {user.email}
            {/* <br />
            <strong>
              <FormattedMessage id="topBar.profileMenu.phone" />:{' '}
            </strong>
            {user.phone || '-'} */}
          </div>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <a href="javascript: void(0);">
            <i className={`${styles.menuIcon} fa fa-user-o`} />
            <FormattedMessage id="topBar.profileMenu.editProfile" />
          </a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <a href="javascript: void(0);" onClick={this.logout}>
            <i className={`${styles.menuIcon} fa fa-sign-out`} />
            <FormattedMessage id="topBar.profileMenu.logout" />
          </a>
        </Menu.Item>
      </Menu>
    )
    return (
      <Dropdown overlay={menu} trigger={['click']}>
        <div className={styles.dropdown}>
          <Badge count={count}>
            <Avatar className={styles.avatar} shape="square" size="large" icon="user" />
          </Badge>
        </div>
      </Dropdown>
    )
  }
}

export default ProfileMenu
