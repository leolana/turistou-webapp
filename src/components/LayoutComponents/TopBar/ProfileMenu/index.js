import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu, Dropdown, Avatar, Badge } from 'antd'
import { FormattedMessage } from 'react-intl'
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

    const menu = (
      <Menu selectable={false}>
        <Menu.Item>
          <strong>
            <FormattedMessage id="topBar.profileMenu.hello" />,{' '}
          </strong>
          {user.name || 'Anonymous'}
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <div>
            <strong>
              <FormattedMessage id="topBar.profileMenu.role" />:{' '}
            </strong>
            {user.role}
          </div>
          <div>
            <strong>
              <FormattedMessage id="topBar.profileMenu.email" />:{' '}
            </strong>
            {user.email}
          </div>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <Link to="/profile/edit">
            <i className={`${styles.menuIcon} fa fa-user-o`} />
            <FormattedMessage id="topBar.profileMenu.editProfile" />
          </Link>
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
            <Avatar
              src={user.avatar}
              className={styles.avatar}
              shape="square"
              size="large"
              icon="user"
            />
          </Badge>
        </div>
      </Dropdown>
    )
  }
}

export default ProfileMenu
