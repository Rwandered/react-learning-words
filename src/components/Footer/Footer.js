import React from 'react'
import {ReactComponent as ReactLogSvg} from '../../logo.svg'
import s from './Footer.module.scss'

const Footer = () => {
  return (
    <div className={s.footer}>
      <p className={ s.title}>Made by ReactJS</p>
      <div className={s.logo}>
        <ReactLogSvg/>
      </div>
    </div>
  )
}

export default Footer

