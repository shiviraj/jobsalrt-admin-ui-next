export const NAMESPACE = 'USER/'

export const VALIDATE_USER = NAMESPACE + 'VALIDATE_USER'
export const VALIDATE_USER_SUCCESS = NAMESPACE + 'VALIDATE_USER_SUCCESS'
export const VALIDATE_USER_ERROR = NAMESPACE + 'VALIDATE_USER_ERROR'

const validateUser = () => ({
  type: VALIDATE_USER,
})

const validateUserSuccess = (data) => ({
  type: VALIDATE_USER_SUCCESS,
  payload: data
})

const validateUserError = ({error}) => ({
  type: VALIDATE_USER_ERROR,
  payload: {error}
})

export {validateUser, validateUserSuccess, validateUserError}
