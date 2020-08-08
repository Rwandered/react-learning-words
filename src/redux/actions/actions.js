import {
  ADD_COUNTER,
  ADD_USER,
  DEL_USER,
  FETCH_CARDS, FETCH_CARDS_REJECT,
  FETCH_CARDS_RESOLVE, NEED_AUTH,
  SUB_COUNTER
} from "../types/types";

export const addCounter = amount => {
  return {
    type: ADD_COUNTER,
    payload: amount
  }
}

export const subCounter = amount => {
  return {
    type: SUB_COUNTER,
    payload: amount
  }
}

// export const setDone = () => {
//   return {
//     type: CARD_DONE
//   }
// }

export const addUserAction = user => {
  return {
    type: ADD_USER,
    user
  }
}

export const delUserAction = () => {
  return {
    type: DEL_USER,
  }
}

export const needAuthToLogIn = () => {
  return {
    type: NEED_AUTH,
  }
}


export const cardsAction = () => {
  return {
    type: FETCH_CARDS
  }
}

export const cardsResolveAction = (payload) => {
  return {
    type: FETCH_CARDS_RESOLVE,
    payload,
  }
}

export const cardsRejectAction = (error) => {
  return {
    type: FETCH_CARDS_REJECT,
    error,
  }
}
//getData - метод, который будет переден из компонента, это метод и сделаем нам запрос
// за карточками
//метод fetchCardsFromDb - позволяет подписаться на события изменения данные в бд
export const fetchCardsFromDb = getData => {
  return  (dispatch, getState) => {
    try {
      dispatch( cardsAction() )  //отправили в стор экшен для инициализации объекта карточек

      getData().on('value', res => {
        const cards = res.val()
        const $cards = cards ? Object.values(cards) : []
        dispatch( cardsResolveAction($cards) ) // отправили в стор экшен на создание карточек

      })
    } catch (error) {
      dispatch( cardsRejectAction(error) ) // отправили в стор экшен на ошибку
    }
  }
}
