import {compose, createStore} from 'redux'
import {install} from 'redux-loop'
import {createReducerManager} from './reducer'
import userReducer from "../modules/user/reducer";
import postsReducer from "../modules/posts/reducer";
import postReducer from "../modules/editPost/reducer";

const staticReducers = {
  user: userReducer,
  posts: postsReducer,
  post: postReducer
}

const reduxDevTools = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
const isProduction = process.env.NODE_ENV === 'production'

const composeFn = (!isProduction && reduxDevTools) || compose

const enhancers = composeFn(install())

function configureStore(initialState, reducers) {
  const reducerManager = createReducerManager(reducers)
  const store = createStore(reducerManager.reduce, initialState, enhancers)

  store.reducerManager = reducerManager

  return store
}

let store = configureStore({}, staticReducers)

export {configureStore}
export default store
