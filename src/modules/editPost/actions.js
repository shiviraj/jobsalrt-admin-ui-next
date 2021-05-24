export const NAMESPACE = 'GET_POSTS/'

export const GET_POST = NAMESPACE + 'GET_POST'
export const GET_POST_SUCCESS = NAMESPACE + 'GET_POST_SUCCESS'
export const GET_POST_ERROR = NAMESPACE + 'GET_POST_ERROR'
export const SAVE_POST = NAMESPACE + 'SAVE_POST'

const getPost = (payload) => ({
  type: GET_POST,
  payload
})

const getPostSuccess = (data) => ({
  type: GET_POST_SUCCESS,
  payload: {data}
})

const getPostError = ({error}) => ({
  type: GET_POST_ERROR,
  payload: {error}
})

const savePost = (payload) => ({
  type: SAVE_POST,
  payload
})

export {getPost, getPostSuccess, getPostError, savePost}
