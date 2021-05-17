export const NAMESPACE = 'USER_PROFILE/'

export const LOG_IN = NAMESPACE + 'LOG_IN'
export const LOG_IN_SUCCESS = NAMESPACE + 'LOG_IN_SUCCESS'
export const LOG_IN_ERROR = NAMESPACE + 'LOG_IN_ERROR'

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

export {login, loginSuccess, loginError}
