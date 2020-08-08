import React, { Component } from 'react'
import Slider from 'react-slick'
import CustomSearch from "../Search/Search"
import Form from '../Form/Form'
import s from './Slider.module.scss'



class ReactSlider extends Component {


  render() {

    const settings = {
      dots: false,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1
    }

    const formSettings = {
      title: 'Задайте слова' ,
      type: ['text', 'text'],
      required: [true, true],
      name: ['rusValue', 'engValue'],
      placeholder: ['Input russian word...', 'Input english word...'],
      btnText: 'Add card',
    }


    return (
      <div className={s.sliderWrapper}>
        <Slider {...settings}>
          <Form {...formSettings} />
          <CustomSearch/>
        </Slider>
      </div>
    )
  }
}


export default ReactSlider