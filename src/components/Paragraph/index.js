import React from 'react'
import s from './Paragraph.module.scss'

const Paragraph = ( { children } ) => <p className = { s.paragraph}> { children} </p>

export default Paragraph