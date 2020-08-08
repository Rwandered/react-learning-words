import React, {Component} from 'react'
import { connect } from 'react-redux'
import HeaderBlock from '../../components/HeaderBlock'
import Header from '../../components/Header'
import Paragraph from '../../components/Paragraph'
import Content from '../../components/Content/Content'
import Footer from '../../components/Footer/Footer'
import FirebaseContext from '../../context/firebaseContext'
import { LogoutOutlined } from '@ant-design/icons'
import s from './Home.module.scss'
import {Button} from "antd";
import {addCounter, delUserAction, subCounter} from "../../redux/actions/actions";
// // import {plusAction} from "../../actions";
// import * as actions from "../../actions";
// import {bindActionCreators} from "redux";
// import Button from "antd/es/button";



class Home extends Component {

  // state = {
  //   wordList: []
  // }
  // //вызывается сразу после инициализации компонента
  // componentDidMount() {
  //   this.getWordsFromDatabase()
  // }
  //
  // componentWillUnmount() {
  //   const { getUserCardsRef } = this.context
  //   getUserCardsRef().off()
  // }


  // // once - для  наблюдения за событиями
  // getWordsFromDatabase = () => {
  //   const { getUserCardsRef, setUserCards } = this.context
  //
  //   getUserCardsRef().on('value', res => {
  //     const cards = res.val()
  //     const $cards = cards ? Object.values(cards) : []
  //
  //     this.setState( {
  //       wordList: $cards
  //     })
  //
  //     setUserCards($cards)
  //   })
  // }

  render() {
    // const { wordList } = this.state
    const { exitFromDatabase } = this.context
    const { numOfCounter, addCount, subCount, delUser, history } = this.props


    return (
      <React.Fragment>
        <div className={s.exitWrap}>
          <div className={s.exit}>
            <LogoutOutlined onClick={ () => {
              exitFromDatabase()
              delUser()
              history.push('/auth')
            }} />
          </div>
        </div>
        <HeaderBlock>
          <Header>
            Время учить слова онлайн
          </Header>
          <div>
            <h2>{ numOfCounter }</h2>
          </div>
          <Button onClick={ () => addCount(2) }>Plus</Button>
          <Button onClick={ () => subCount(1) }>Minus</Button>
          <Paragraph>
            Используйте карточки для запоминания и пополняйте активный словарный запас
          </Paragraph>
        </HeaderBlock>
        <Content
          // item={ wordList }
        />
        <HeaderBlock blockHeight={25} backgroundColor={'rgba(10, 143, 196, .7)'}>
          <Header>
            Дальше - больше...
          </Header>
          <Paragraph>
            Развивайся!
          </Paragraph>
        </HeaderBlock>
        <HeaderBlock  blockHeight={10} backgroundColor={'rgba(10, 143, 196, .7)'}>
          <Footer text={ 'Made by ReactJS' }/>
        </HeaderBlock>
      </React.Fragment>
    )

  }
}

Home.contextType = FirebaseContext

// const mapDispatchToProps = (dispatch) => {
//   // return {
//   //   plus: (arg) => dispatch(plusAction(arg))
//   // }
//   return bindActionCreators(actions, dispatch)
// }

// mapStateToProps - сопоставить состояние со свойствами
const mapStateToProps = state => {
  return {
    numOfCounter: state.counter.count
  }
}

// функция, которая передает dispatch методы в props компонента
// соответственно их от туда можно достать и использовать для изменения state in store
const mapDispatchToProps = dispatch => {
 return {
   addCount: (amount) => dispatch(addCounter(amount)),
   subCount: (amount) => dispatch(subCounter(amount)),
   delUser: (user) => dispatch( delUserAction(user) ),
 }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)