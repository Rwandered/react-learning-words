import {ADD_USER, DEL_USER, NEED_AUTH} from "../types/types";

const initialState = {
  userUid: null
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        userUid: action.user.uid,
      }
    case DEL_USER:
      return {
        ...state,
        userUid: false
      }

    case NEED_AUTH:
      return  {
        ...state,
        userUid: false
      }

    default: return state
  }
}