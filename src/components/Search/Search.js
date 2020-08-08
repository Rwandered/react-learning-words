import React, {Component} from 'react'
import { Input } from 'antd'
import s from './Search.module.scss'
import translateWord from '../../services/yandex-dectionary'
import FirebaseContext from '../../context/firebaseContext'
import  { notification } from 'antd'
import {connect} from "react-redux";

const { Search } = Input

class CustomSearch extends Component {

  state = {
    value: '',
    isBusy: false
  }

  handlerInputChange = event => {
    this.setState( {
      value: event.target.value.trim()
    })
  }

  getWord =  async () => {

    try {
      const { getUserCardsRefWithParam } = this.context
      const { userCards } = this.props
      const translate = await translateWord(this.state.value)
      console.log('TRANSLATE: ', translate)
      if(translate.length) {

        const newWord = {
          eng: this.state.value,
          rus: translate[0].tr[0].text,
          id: userCards.length ? Math.floor( Math.random() * Math.floor(500)) : 0,
          remember: false,
        }
        getUserCardsRefWithParam(newWord.id).set( newWord )
          .then( () => {
            notification.success( {
              message: 'New card',
              description: 'New card has been added...'
            })
          })

      } else {
        notification.error( {
          message: 'Translate',
          description: 'Translate not found...'
        })
      }

      this.setState({
        value: '',
        isBusy: false,
      })

    } catch (err) {
      notification.error( {
        message: 'Database',
        description: `Error: ${err}`
      })
    }
  }


  handlerSubmitForm = async () => {
    this.setState( {
      isBusy: true
    }, this.getWord)
  }


  render() {

    const { value, isBusy } = this.state

    return (
      <div className={s.searchCover}>
        <div className={s.searchWrap}>
          <h2>Авто перевод</h2>
          <Search
            value={ value }
            enterButton='Add card'
            onChange={this.handlerInputChange}
            onSearch={ this.handlerSubmitForm }
            required={ true }
            size="large"
            placeholder='Input english word...'
            loading={ isBusy }
          />
          <span>«Реализовано с помощью сервиса <a href="https://tech.yandex.ru/dictionary">«Яндекс.Словарь»</a></span>
        </div>
      </div>
    )
  }
}

CustomSearch.contextType = FirebaseContext

const mapStateToProps = state => {
  return {
    userCards: state.cards.cardsArray || []
  }
}

export default connect(mapStateToProps ,null)(CustomSearch)