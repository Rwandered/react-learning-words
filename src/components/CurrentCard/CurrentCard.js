import React, { PureComponent } from 'react'
import Card from "../Card/Card";
import FirebaseContext from "../../context/firebaseContext";
import s from './CurrentCard.module.scss'
import { CloseOutlined} from '@ant-design/icons'

class CurrentCard extends PureComponent {
  state = {
    word: {
      id: '',
      eng: '',
      rus: '',
      isRemembered: false,
    }
  }

  componentDidMount() {


    const { getCurrentCardByUser } = this.context
    getCurrentCardByUser(this.props.match.params.id).once('value')
      .then( res => {
      this.setState( {
          word: {
            id: res.val().id,
            eng: res.val().eng,
            rus: res.val().rus,
            isRemembered: res.val().remember,
          }
        })
      })
  }

  handlerCloseCurrentCard = () => {
    const { history } = this.props
    history.push('/')
  }

  render() {
    const { word: {id, eng, rus, isRemembered } } = this.state

    return (
      <>
        <div className={s.cover}>
          <div className={s.currentCard}>
            <div className={s.wrap}>
              <div className={s.header}>
                <div>
                  <h2>Word card view </h2>
                </div>
                <div>
                  <CloseOutlined onClick={ this.handlerCloseCurrentCard }/>
                </div>
              </div>
              <Card
                key={id}
                eng={eng}
                rus={rus}
                id = {id}
                remember={ isRemembered }
              />
            </div>
          </div>
        </div>
      </>
    )
  }
}

CurrentCard.contextType = FirebaseContext
export default  CurrentCard