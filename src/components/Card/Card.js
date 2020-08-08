import React from 'react'
import cn from 'classnames'
import { withRouter } from 'react-router-dom'
// import { connect } from 'react-redux'
import FirebaseContext from '../../context/firebaseContext'
import {notification} from 'antd'
import { CheckSquareFilled, DeleteOutlined, ArrowsAltOutlined } from '@ant-design/icons'
import s from './Card.module.scss'
// import {addCounter, setDone, subCounter} from "../../redux/actions/actions";


class Card extends React.Component {
  state = {
    done: false,
    isRemembered: this.props.remember,
  }


  handlerCardClick = () => {
    if(this.state.isRemembered) {
      return
    }
    // this.props.setDone()
    this.setState( (state, props) => {
      return {
        done: !state.done
      }
    })
  }

  handlerIsRememberClick = () => {
    if( this.state.isRemembered) {
      return
    }
    // this.props.setDone()

    this.setState( (state, props ) => {
      return {
        isRemembered: !state.isRemembered,
        done: !state.done

      }
    }, this.updateWord)
  }

  handlerDeletedCard = id => {

    const { history } = this.props

    const { getUserCardsRefWithParam } = this.context
    getUserCardsRefWithParam(id).remove()
      .then( () => {
        notification.info( {
          message: 'Del card',
          description: 'Card was deleted...'
        })
        history.push('/')
      })
  }

  updateWord = () => {
    this.context.getUserCardsRefWithParam(`${this.props.id}/remember`).set(this.state.isRemembered)
      .then( () => {
        notification.success( {
          message: 'Remember',
          description: 'Congratulations!!! You remembered this word...'
        })
      })
  }

  handlerViewCurrentCard = id => {
    const { history } = this.props
    history.push(`/word/${id}`)
  }


  render() {

    const {eng, rus, id } = this.props
    // console.log('PROPS FROM CARD: ', this.props)
    const { done, isRemembered } = this.state

    return (
      <div className={ s.root }>
        <div
          className={ cn(s.card, {
            [s.done]: done,
            [s.isRemembered]: isRemembered
          }) }
          onClick={ this.handlerCardClick}
        >
          <div className={s.cardInner}>
            <div className={s.cardFront}>
              {eng}
            </div>
            <div className={s.cardBack}>
              {rus}
            </div>
          </div>
        </div>
        <div className={s.icons}>
          <ArrowsAltOutlined onClick={ () => this.handlerViewCurrentCard(id)} />
        </div>
        <div className={s.icons}>
          <CheckSquareFilled onClick={this.handlerIsRememberClick} />
        </div>
        <div className={s.icons}>
          <DeleteOutlined  onClick={ () => this.handlerDeletedCard(id)}/>
        </div>

      </div>

    )
  }
}

Card.contextType = FirebaseContext

// const mapStateToProps = state => {
//   return {
//     done: state.isDone.done
//   }
// }
//
// const mapDispatchToProps = dispatch => {
//   return {
//    setDone: () => dispatch( setDone() )
//   }
// }


// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Card))
export default withRouter(Card)

//хранение state done в store redux привело к одновременному изменению
// state у всех карточек