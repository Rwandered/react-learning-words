import {combineReducers} from 'redux'
import {counterReducer} from './counterReducer'
// import {cardDoneReducer} from "./cardDoneReducer";
import {userReducer} from "./userReducer";
import {cardsReducer} from "./cardsReducer";



export const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
  cards: cardsReducer,
})