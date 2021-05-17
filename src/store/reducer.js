import {combineReducers} from 'redux-loop'
import store from './index'

const createReducerManager = initialReducers => {
  const reducers = {...initialReducers}
  let combinedReducer = combineReducers(reducers)
  let keysToRemove = []
  return {
    getReducerMap: () => combinedReducer,
    reduce: (state, action) => {
      if (keysToRemove.length > 0) {
        state = {...state}
        for (let key of keysToRemove) {
          delete state[key]
        }
        keysToRemove = []
      }
      return combinedReducer(state, action)
    },
    add: (key, reducer) => {
      if (!key || reducers[key]) {
        return false
      }
      reducers[key] = reducer
      combinedReducer = combineReducers(reducers)
      return true
    },

    remove: key => {
      if (!key || !reducers[key]) {
        return
      }

      delete reducers[key]

      keysToRemove.push(key)

      combinedReducer = combineReducers(reducers)
    }
  }
};

const addReducer = async (key, namespace, path) => {
  const reducer = await import('../modules/' + path)

  if (!reducer.default) return Promise.reject()

  const isReducerAddedSuccessfully = store.reducerManager.add(key, reducer.default)

  if (isReducerAddedSuccessfully) {
    // TODO: HARDCODING REDUCER LOADER ACTION FOR NOW, ADD THIS ACTION TO GLOBAL LEVEL
    const action = {
      type: namespace + 'REDUCER_LOADED'
    }

    store.dispatch(action)
  }

  return Promise.resolve()
};

export {createReducerManager, addReducer}
