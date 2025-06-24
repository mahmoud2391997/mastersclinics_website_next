import { combineReducers } from 'redux'

// Simple initial state
const initialAppState = {
  loading: false,
  error: null,
}

// Simple reducer without hooks
const appReducer = (state = initialAppState, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  app: appReducer,
})

export default rootReducer
