import React, {Component} from 'react'
import Home from './pages/Home/Home'
import Auth from './pages/Auth/Auth'
import { connect } from 'react-redux'
import { Spin } from 'antd'
import FirebaseContext from './context/firebaseContext'
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom'
import { PrivateRoute } from './utils/privateRoute'
import CurrentCard from './components/CurrentCard/CurrentCard'
import s from './App.module.scss'
import {addUserAction, needAuthToLogIn} from "./redux/actions/actions";



class App extends Component {

  componentDidMount() {

    const { auth, setUserUid } = this.context
    const { addUser, needAuth } = this.props

    auth.onAuthStateChanged( user => {
    if(user) {

      setUserUid(user.uid)
      localStorage.setItem('user', JSON.stringify(user.uid))
      addUser(user) // добавили user в store
      } else {
        needAuth()

        setUserUid(null)
        localStorage.removeItem('user')
      }
    })
  }


  render() {
    const { userUid } = this.props

    if(userUid === null) {
      return (
        <div className={s.loader_wrap}>
          <Spin size="large" />
        </div>
      )
    }

    return (
      <Router>
        <Switch>
          <PrivateRoute path={'/'} exact component={ Home }/>
          <PrivateRoute path={'/word/:id'} component={ CurrentCard }/>
          <Route path={'/auth'} component={ Auth }/>
          <Redirect to='/auth'/>
        </Switch>
      </Router>
    )
  }
}

App.contextType = FirebaseContext

const mapStateToProps = (state) => {
  return {
    userUid: state.user.userUid,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (user) => dispatch( addUserAction(user) ),
    needAuth: () => dispatch( needAuthToLogIn() )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
