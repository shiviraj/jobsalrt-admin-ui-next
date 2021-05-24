import {
  VALIDATE_USER,
  VALIDATE_USER_ERROR,
  VALIDATE_USER_SUCCESS,
  validateUserError,
  validateUserSuccess,
} from './actions'

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

    case VALIDATE_USER:
      return loop(
        {...state, loading: true, error: false, errorMessage: null, data: null},
        Cmd.run(API.user.validateUser, {
          successActionCreator: validateUserSuccess,
          failActionCreator: validateUserError
        })
      )

    case VALIDATE_USER_SUCCESS: {
      const data = action.payload
      return {...state, loading: false, data}
    }

    case VALIDATE_USER_ERROR: {
      return {...state, error: true, loading: false, errorMessage: "User not found!!"}
    }

    default:
      return state
  }
}


export {defaultState}
export default userReducer
