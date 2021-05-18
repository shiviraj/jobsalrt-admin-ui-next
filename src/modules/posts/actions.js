export const NAMESPACE = 'POSTS/'

export const POSTS_COUNT = NAMESPACE + 'POSTS_COUNT'
export const POSTS_COUNT_SUCCESS = NAMESPACE + 'POSTS_COUNT_SUCCESS'
export const POSTS_COUNT_ERROR = NAMESPACE + 'POSTS_COUNT_ERROR'
export const GET_POSTS = NAMESPACE + 'GET_POSTS'
export const GET_POSTS_SUCCESS = NAMESPACE + 'GET_POSTS_SUCCESS'
export const GET_POSTS_ERROR = NAMESPACE + 'GET_POSTS_ERROR'


const postsCount = () => ({
  type: POSTS_COUNT,
})

const postsCountSuccess = ({data}) => ({
  type: POSTS_COUNT_SUCCESS,
  payload: {data}
})

const postsCountError = ({error}) => ({
  type: POSTS_COUNT_ERROR,
  payload: {error}
})


const getPosts = (payload) => ({
  type: GET_POSTS,
  payload
})

const getPostsSuccess = ({data}) => ({
  type: GET_POSTS_SUCCESS,
  payload: {data}
})

const getPostsError = ({error}) => ({
  type: GET_POSTS_ERROR,
  payload: {error}
})


export {postsCount, postsCountSuccess, postsCountError, getPosts, getPostsSuccess, getPostsError}
