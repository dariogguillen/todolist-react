import { createStore, compose } from 'redux'

import persistState, { mergePersistedState } from 'redux-localstorage'
import adapter from 'redux-localstorage/lib/adapters/localStorage'

import rootReducer from './reducers'

const reducer = compose(mergePersistedState())(rootReducer)

const storage = adapter(window.localStorage)

const createPersistentStore = compose(persistState(storage, 'state'))(
  createStore
)

const store = createPersistentStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

if (module.hot) {
  module.hot.accept('./reducers', () => {
    const nextReducer = require('./reducers').default
    store.replaceReducer(nextReducer)
  })
}

export default store
