import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { logger } from 'redux-logger'
import thunk from 'redux-thunk'
import { rootReducer } from './redux/reducers/rootRedicer'
import App from './App'
import FirebaseContext from "./context/firebaseContext";
import Firebase from "./services/work-database";
import 'antd/dist/antd.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import  'normalize.css'
import './index.css'
import  './styles.scss'


// import {counter} from "./components/reducers/counter";
// import * as actions from "./actions";


// const { dispatch } = store
// const { plusAction, minusAction} = bindActionCreators(actions, dispatch)
//
// store.subscribe( () => {
//   console.log('STORE: ', store.getState())
// })
//
// // store.dispatch( plusAction(5) )
// // store.dispatch( minusAction(2))
// plusAction(5)
// minusAction(10)

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunk,
    logger
  )
)

ReactDOM.render(
  <Provider store={ store }>
    <FirebaseContext.Provider
      value={ new Firebase() }>
      <Router>
        <App/>
      </Router>
    </FirebaseContext.Provider>
  </Provider>, document.getElementById('root'))
