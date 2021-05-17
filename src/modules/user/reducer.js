import {LOG_IN, LOG_IN_ERROR, LOG_IN_SUCCESS, loginError, loginSuccess,} from './actions'

import {Cmd, loop} from 'redux-loop'
import API from '../../API'

const defaultState = () => ({
  loading: false,
  error: false,
  errorMessage: null,
  data: null
})

const userReducer = (state = defaultState(), action) => {
  switch (action.type) {
    case LOG_IN:
      return loop(
        {...state, loading: true, error: false, errorMessage: null, data: null},
        Cmd.run(API.user.login, {
          args: [action.payload],
          successActionCreator: loginSuccess,
          failActionCreator: loginError
        })
      )

    case LOG_IN_SUCCESS: {
      const {data: token} = action.payload.data
      return {...state, loading: false, data: {...token}}
    }

    case LOG_IN_ERROR: {
      return {...state, error: true, loading: false, errorMessage: "Invalid Credentials, Try Again!!"}
    }

    default:
      return state
  }
}


export {defaultState}
export default userReducer
