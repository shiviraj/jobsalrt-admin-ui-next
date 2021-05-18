export const NAMESPACE = 'POSTS/'

export const POSTS_COUNT = NAMESPACE + 'POSTS_COUNT'
export const POSTS_COUNT_SUCCESS = NAMESPACE + 'POSTS_COUNT_SUCCESS'
export const POSTS_COUNT_ERROR = NAMESPACE + 'POSTS_COUNT_ERROR'
export const GET_POSTS = NAMESPACE + 'GET_POSTS'
export const GET_POSTS_SUCCESS = NAMESPACE + 'GET_POSTS_SUCCESS'
export const GET_POSTS_ERROR = NAMESPACE + 'GET_POSTS_ERROR'
export const ADD_NEW_POST = NAMESPACE + 'ADD_NEW_POST'
export const ADD_NEW_POST_SUCCESS = NAMESPACE + 'ADD_NEW_POST_SUCCESS'
export const ADD_NEW_POST_ERROR = NAMESPACE + 'ADD_NEW_POST_ERROR'
export const DELETE_POST = NAMESPACE + 'DELETE_POST'
export const DELETE_POST_SUCCESS = NAMESPACE + 'DELETE_POST_SUCCESS'
export const DELETE_POST_ERROR = NAMESPACE + 'DELETE_POST_ERROR'
export const RELOAD = NAMESPACE + 'RELOAD'


const postsCount = (payload) => ({
  type: POSTS_COUNT,
  payload
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

const addNewPost = (payload) => ({
  type: ADD_NEW_POST,
  payload
})

const addNewPostSuccess = ({data}) => ({
  type: ADD_NEW_POST_SUCCESS,
  payload: {data}
})

const addNewPostError = ({error}) => ({
  type: ADD_NEW_POST_ERROR,
  payload: {error}
})


const deletePost = (payload) => ({
  type: DELETE_POST,
  payload
})

const deletePostSuccess = ({data}) => ({
  type: DELETE_POST_SUCCESS,
  payload: {data}
})

const deletePostError = ({error}) => ({
  type: DELETE_POST_ERROR,
  payload: {error}
})

const reloadPosts = (payload = {}) => ({
  type: RELOAD,
  payload
})


export {
  postsCount,
  postsCountSuccess,
  postsCountError,
  getPosts,
  getPostsSuccess,
  getPostsError,
  addNewPost,
  addNewPostSuccess,
  addNewPostError,
  deletePost,
  deletePostSuccess,
  deletePostError,
  reloadPosts
}
