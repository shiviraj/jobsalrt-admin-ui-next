export const NAMESPACE = 'USER/'

export const LOG_IN = NAMESPACE + 'LOG_IN'
export const LOG_IN_SUCCESS = NAMESPACE + 'LOG_IN_SUCCESS'
export const LOG_IN_ERROR = NAMESPACE + 'LOG_IN_ERROR'
export const VALIDATE_USER = NAMESPACE + 'VALIDATE_USER'
export const VALIDATE_USER_SUCCESS = NAMESPACE + 'VALIDATE_USER_SUCCESS'
export const VALIDATE_USER_ERROR = NAMESPACE + 'VALIDATE_USER_ERROR'

const login = (email, password) => ({
  type: LOG_IN,
  payload: {email, password}
})

const loginSuccess = ({data}) => ({
  type: LOG_IN_SUCCESS,
  payload: {data}
})

const loginError = ({error}) => ({
  type: LOG_IN_ERROR,
  payload: {error}
})


const validateUser = () => ({
  type: VALIDATE_USER,
})

const validateUserSuccess = ({data}) => ({
  type: VALIDATE_USER_SUCCESS,
  payload: {data}
})

const validateUserError = ({error}) => ({
  type: VALIDATE_USER_ERROR,
  payload: {error}
})

export {login, loginSuccess, loginError, validateUser, validateUserSuccess, validateUserError}
