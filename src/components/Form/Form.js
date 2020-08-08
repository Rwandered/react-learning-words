import React, {Component} from 'react'
import FirebaseContext from '../../context/firebaseContext'
import s from './Form.module.scss'
import {notification} from 'antd'
import {connect} from "react-redux";



class Form extends Component {

  state = {
    engValue: '',
    rusValue: '',
    email: '',
    pwd:'',
    connectType: 'Log In',
  }


  handlerInputChange = event => {

    this.setState( {
      [event.target.name]: event.target.value
    })

  }


  handlerSubmitForm = event => {
    event.preventDefault()

    const { getUserCardsRefWithParam } = this.context
    const { userCards } = this.props


    if(this.state.email) {

      this.props.onAuth({
        email: this.state.email,
        password: this.state.pwd
      })

    } else {
      const newWord = {
        eng: this.state.engValue,
        rus: this.state.rusValue,
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
    }

    this.setState( () => {
      return {
        engValue: '',
        rusValue: '',
        email: '',
        pwd:'',
      }
    })
  }

  handlerToSignUp = (event) => {
    this.setState({
      connectType: event.target.textContent,
    }, () => this.props.onToSignUp( this.state.connectType ))
  }



  render() {

    const { title, required, type, name, placeholder, btnText, btnWidth, signUpTitle} = this.props


    const fromBtnStyles = btnWidth && { width: btnWidth }

    return (
      <div className={s.formWrap}>
        <form
          className={s.form}
          onSubmit={ this.handlerSubmitForm }
        >
          <h2> { signUpTitle ? this.state.connectType : title  }  </h2>
          <input
            type={ type[0] }
            value={ this.state[name[0]] }
            onChange={this.handlerInputChange}
            required={ required[0]}
            name={ name[0]}
            placeholder={ placeholder[0]}
          />
          <input
            type={ type[1]}
            value={ this.state[name[1]] }
            onChange={this.handlerInputChange}
            required={ required[1]}
            name={ name[1] }
            placeholder={ placeholder[1]}
          />
          <>
            {
              signUpTitle
                ? <div className={s.connectType}><span onClick={ this.handlerToSignUp }> { signUpTitle } </span></div>
                : null
            }
          </>

          <button type={'submit'} style={ fromBtnStyles }>
            <p> { signUpTitle ? this.state.connectType : btnText } </p>
          </button>
        </form>
      </div>
    )
  }
}

Form.contextType = FirebaseContext

const mapStateToProps = state => {
  return {
    userCards: state.cards.cardsArray || []
  }
}

export default connect(mapStateToProps, null)(Form)


