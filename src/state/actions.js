import {
  TOGGLE_DIALOG,
  SET_INFO,
  DELETE_ITEM,
  FINISH_EDITION,
  TOGGLE_COUNTDOWN,
  EXECUTE,
  COMPLETED,
  RESET
} from './constants'

export const toggleDialog = isOpen => ({
  type: TOGGLE_DIALOG,
  payload: isOpen
})

export const setInfo = item => ({
  type: SET_INFO,
  payload: item
})

export const deleteItem = item => ({
  type: DELETE_ITEM,
  payload: item
})

export const editItem = item => ({
  type: FINISH_EDITION,
  payload: item
})

export const toggleCountdown = item => ({
  type: TOGGLE_COUNTDOWN,
  payload: item
})

export const startExecutionAt = item => ({
  type: EXECUTE,
  payload: item
})

export const completed = item => ({
  type: COMPLETED,
  payload: item
})

export const reset = item => ({
  type: RESET,
  payload: item
})
