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

const initialState = {
  tasks: [],
  open: false
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DIALOG:
      return { ...state, open: action.payload }
    case SET_INFO:
      return { ...state, tasks: [...state.tasks, action.payload] }
    case DELETE_ITEM:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload.id)
      }
    case FINISH_EDITION:
      return {
        ...state,
        tasks: state.tasks.map(task => {
          if (task.id === action.payload.id) {
            task.task = action.payload.task
            task.time = action.payload.time
            task.timeToShow = action.payload.time
            task.isComplete = action.payload.isComplete
            task.timeInSeconds = action.payload.timeInSeconds
            task.modifiedAt = action.payload.modifiedAt
            return task
          }
          return task
        })
      }
    case TOGGLE_COUNTDOWN:
      return {
        ...state,
        tasks: state.tasks.map(task => {
          if (task.id === action.payload.id) {
            task.isPlaying = action.payload.isPlaying
            task.timeToShow = action.payload.timeToShow
            return task
          }
          return task
        })
      }
    case EXECUTE:
      return {
        ...state,
        tasks: state.tasks.map(task => {
          if (task.id === action.payload.id) {
            task.executedAt = action.payload.executedAt
            return task
          }
          return task
        })
      }
    case COMPLETED:
      return {
        ...state,
        tasks: state.tasks.map(task => {
          if (task.id === action.payload.id) {
            task.isComplete = action.payload.isComplete
            return task
          }
          return task
        })
      }
    case RESET:
      return {
        ...state,
        tasks: state.tasks.map(task => {
          if (task.id === action.payload.id) {
            task.isComplete = action.payload.isComplete
            task.timeToShow = action.payload.timeToShow
            return task
          }
          return task
        })
      }

    default:
      return state
  }
}
export default rootReducer
