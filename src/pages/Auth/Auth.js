import React, {Component} from 'react'
import Form from '../../components/Form/Form'
import  s from './Auth.module.scss'
import { connect } from 'react-redux'
import FirebaseContext from '../../context/firebaseContext'
import  { notification } from 'antd'


class Auth extends Component {

  state = {
    isAuth: false,
    connectType: 'Log In',
    isSign: true
  }


  handlerLogIn = ( {email, password} ) => {

    const { getUserByEMail, setUserUid } = this.context
    const { history } = this.props

    getUserByEMail(email, password)
      .then( res => {
        // вот тут мне надо просто добавить пользователя в store

        setUserUid(res.user.uid)
        localStorage.setItem('user', JSON.stringify(res.user.uid))
        history.push('/')
        notification.success( {
          message: 'Log In',
          description: 'Authentication is done'
        })

      })
      .catch( error => {
        notification.error( {
          message: 'Authentication failed',
          description: `Error ${error}`
        })
      })
  }

  handlerToSignUp = ( type ) => {
    this.setState( (state) => {
      return {
        connectType: type,
        isSign: !state.isSign
      }
    })
  }

  handlerSignUp = ( {email, password} ) => {
    const { setUserByEmail, setUserUid } = this.context
    const { history } = this.props

    setUserByEmail(email, password)
      .then( res => {

        // и тут добавить пользователя в store

        setUserUid(res.user.uid)
        localStorage.setItem('user', JSON.stringify(res.user.uid))
        history.push('/')
        notification.success( {
          message: 'Sign Up',
          description: 'User is sign...'
        })
      })
      .catch( error => {
        notification.error( {
          message: 'Sign Up failed',
          description: `Error ${error}`
        })
      })
  }

  handlerAuthIn = authData => {

    console.log('authData: ', authData)

    if(this.state.connectType === 'Log In') {
      this.handlerLogIn( authData)
    } else  {
      this.handlerSignUp( authData)
    }
  }

  handlerGoogleAuth = () => {
    const {  getUserFromSocial } = this.context
    const { setUserUid } = this.context
    const { history } = this.props

    getUserFromSocial('google')
      .then( res => {
        setUserUid(res.user.uid)
        localStorage.setItem('user', JSON.stringify(res.user.uid))
        history.push('/')
        notification.success( {
          message: 'Log In',
          description: 'Authentication is done'
        })
      })
      .catch( error => {
        notification.error( {
          message: 'Log In failed',
          description: `Error ${error}`
        })
      })
  }

  handlerGitHubAuth = () => {
    const {  getUserFromSocial } = this.context
    const { setUserUid } = this.context
    const { history } = this.props

    getUserFromSocial('github')
      .then( res => {

        setUserUid(res.user.uid)
        localStorage.setItem('user', JSON.stringify(res.user.uid))
        history.push('/')
        notification.success( {
          message: 'Log In',
          description: 'Authentication is done'
        })
      })
      .catch( error => {
        notification.error( {
          message: 'Log In failed',
          description: `Error ${error}`
        })
      })
  }



  render() {

    const settings = {
      title: 'Log In' ,
      type: ['text', 'password'],
      required: [true, true],
      name: ['email', 'pwd'],
      placeholder: ['You email', 'You password'],
      btnText: 'Log In',
      btnWidth: '100%'
    }

    return (

      <div className={s.row}>
        <div className={s.greeting}>
          <div className={s.greetLogo}/>
          <div className={s.greetTitle}>{this.state.connectType}</div>
        </div>
        <div className={s.authBlock}>
          <div className={s.authWrap}>
            <div className={s.typeAuth}>
              <div className={s.googleLogo} onClick={this.handlerGoogleAuth}/>
              <div className={s.gitHubLogo} onClick={this.handlerGitHubAuth}/>
              <div className={s.faceBookLogo}/>
            </div>
            <Form
              {...settings }
              onAuth={ authData => this.handlerAuthIn( authData) }
              onToSignUp={ connectType => this.handlerToSignUp( connectType) }
              signUpTitle={ this.state.isSign ? 'Sign Up' : 'Log In'}
            />
          </div>
        </div>
      </div>
    )
  }
}

Auth.contextType = FirebaseContext

export default connect(null, null)(Auth)


