import React from 'react'
import style from './style.module.scss'

const Avatar = (props) => {
  const { size = false, borderColor = '#d2d9e5', src, border = false } = props
  return (
    <a
      className={`${style.avatar} ${size ? style[`size${size}`] : ''} ${
        border ? style.border : ''
      }`}
      href="javascript: void(0);"
      style={{ borderColor }}
    >
      <img src={src} alt="User" />
    </a>
  )
}

export default Avatar
