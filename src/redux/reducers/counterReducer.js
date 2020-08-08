import {ADD_COUNTER, SUB_COUNTER} from "../types/types";


const initialState = {
  count: 0
}
export const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COUNTER:
      return {...state, count: state.count + action.payload}
    case SUB_COUNTER:
      return {...state, count: state.count - action.payload}
    default: return state
  }
}
