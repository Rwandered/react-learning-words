import React from 'react'
import s from './HeaderBlock.module.scss'

const HeaderBlock = ( { hideBackground = false, blockHeight = 100, backgroundColor, children } ) => {

  const styleCover = hideBackground ? { backgroundImage: 'none'} : {}
  styleCover.height = `${blockHeight}vh`
  styleCover.backgroundColor = backgroundColor

  return (
  <div className={ s.cover } style = { styleCover }>
   <div className={ s.wrap } >
       { children }
   </div>
  </div>
  )
}

export default HeaderBlock