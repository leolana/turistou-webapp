import React from 'react'
// import ProjectManagement from './ProjectManagement'
import LiveSearch from './LiveSearch'
import ProfileMenu from './ProfileMenu'

import styles from './style.module.scss'

class TopBar extends React.Component {
  render() {
    return (
      <div className={styles.topbar}>
        {/* <div className="mr-4">
          <ProjectManagement />
        </div> */}
        <div className="mr-auto">
          {/* TODO: */}
          <LiveSearch />
        </div>
        <ProfileMenu />
      </div>
    )
  }
}

export default TopBar
