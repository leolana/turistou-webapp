import 'rc-drawer/assets/index.css'
import React from 'react'
import DrawerMenu from 'rc-drawer'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import MenuLeft from './MenuLeft'
import MenuTop from './MenuTop'

const mapStateToProps = ({ settings }) => ({
  isMenuTop: settings.isMenuTop,
  isMobileMenuOpen: settings.isMobileMenuOpen,
  isMobileView: settings.isMobileView,
  isLightTheme: settings.isLightTheme,
})

@withRouter
@connect(mapStateToProps)
class AppMenu extends React.Component {
  toggleOpen = () => {
    const { dispatch, isMobileMenuOpen } = this.props
    document
      .querySelector('#root')
      .setAttribute(
        'style',
        !isMobileMenuOpen ? 'overflow: hidden; width: 100%; height: 100%;' : '',
      )
    dispatch({
      type: 'settings/CHANGE_SETTING',
      payload: {
        setting: 'isMobileMenuOpen',
        value: !isMobileMenuOpen,
      },
    })
  }

  render() {
    const { isMenuTop, isMobileMenuOpen, isMobileView, isLightTheme } = this.props
    const BootstrappedMenu = () => {
      if (isMobileView) {
        return (
          <DrawerMenu
            getContainer={null}
            level="all"
            open={isMobileMenuOpen}
            onHandleClick={this.toggleOpen}
            onClose={this.toggleOpen}
            className={isLightTheme ? 'drawer-light' : ''}
            maskClosable
          >
            <MenuLeft />
          </DrawerMenu>
        )
      }
      if (isMenuTop) {
        return <MenuTop />
      }
      return <MenuLeft />
    }

    return BootstrappedMenu()
  }
}

export default AppMenu
