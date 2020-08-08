import {FETCH_CARDS, FETCH_CARDS_REJECT, FETCH_CARDS_RESOLVE} from "../types/types";

const initialState = {
  cardsArray: null,
  err: null,
}

export const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CARDS:
      return {
        cardsArray: [],
        err: null,
      }
    case FETCH_CARDS_RESOLVE:
      return {
        cardsArray: action.payload,
        err: null,
      }
    case FETCH_CARDS_REJECT:
      return {
        cardsArray: null,
        err: action.err,
      }
    default: return state
  }
}