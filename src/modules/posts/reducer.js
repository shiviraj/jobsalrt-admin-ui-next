import {Cmd, loop} from "redux-loop";
import {
  ADD_NEW_POST,
  ADD_NEW_POST_ERROR,
  ADD_NEW_POST_SUCCESS,
  addNewPostError,
  addNewPostSuccess,
  DELETE_POST,
  DELETE_POST_ERROR,
  DELETE_POST_SUCCESS,
  deletePostError,
  deletePostSuccess,
  GET_POSTS,
  GET_POSTS_ERROR,
  GET_POSTS_SUCCESS,
  getPostsError,
  getPostsSuccess,
  POSTS_COUNT,
  POSTS_COUNT_ERROR,
  POSTS_COUNT_SUCCESS,
  postsCountError,
  postsCountSuccess,
  RELOAD
} from "./actions";
import API from "../../API";
import {SORT} from "../../constants/sort";

const defaultState = () => ({
  loading: false,
  error: false,
  errorMessage: null,
  data: null,
  filters: {},
  currentPage: 1,
  totalPage: 1,
  totalPosts: 0,
  sortBy: SORT.sortBy.CREATED_AT,
  sortOrder: SORT.sortOrder.DESC,
  reload: 0
})

const userReducer = (state = defaultState(), action) => {
  switch (action.type) {
    case POSTS_COUNT:
      state = {...state, loading: true, error: false, errorMessage: null, ...action.payload}
      return loop(
        state,
        Cmd.run(API.posts.postsCount, {
          args: [state.currentPage, state.filters, state.sortBy, state.sortOrder],
          successActionCreator: postsCountSuccess,
          failActionCreator: postsCountError
        })
      )

    case POSTS_COUNT_SUCCESS: {
      const {data} = action.payload
      return {...state, loading: false, totalPage: data.page, totalPosts: data.totalPost}
    }

    case POSTS_COUNT_ERROR: {
      return {...state, error: true, loading: false, errorMessage: "Unable to fetch Page Count. Try Again"}
    }

    case GET_POSTS:
      state = {...state, loading: true, error: false, errorMessage: null, data: null, ...action.payload}
      return loop(state,
        Cmd.run(API.posts.getPosts, {
          args: [state.currentPage, state.filters, state.sortBy, state.sortOrder],
          successActionCreator: getPostsSuccess,
          failActionCreator: getPostsError
        })
      )

    case GET_POSTS_SUCCESS: {
      const {data: posts} = action.payload
      return {...state, loading: false, data: posts}
    }

    case GET_POSTS_ERROR: {
      return {...state, error: true, loading: false, errorMessage: "Unable to fetch posts. Try Again"}
    }

    case ADD_NEW_POST:
      return loop(
        {...state, loading: true, error: false, errorMessage: null},
        Cmd.run(API.posts.addNewPost, {
          args: [action.payload],
          successActionCreator: addNewPostSuccess,
          failActionCreator: addNewPostError
        })
      )

    case ADD_NEW_POST_SUCCESS: {
      return {...state, loading: false}
    }

    case ADD_NEW_POST_ERROR: {
      return {...state, error: true, loading: false, errorMessage: "Unable to add new post, try again!!"}
    }

    case DELETE_POST:
      return loop(
        {...state, loading: true, error: false, errorMessage: null},
        Cmd.run(API.posts.deletePost, {
          args: [action.payload],
          successActionCreator: deletePostSuccess,
          failActionCreator: deletePostError
        })
      )

    case DELETE_POST_SUCCESS: {
      return {...state, loading: false}
    }

    case DELETE_POST_ERROR: {
      return {...state, error: true, loading: false, errorMessage: "Unable to delete post, try again!!"}
    }

    case RELOAD: {
      return {...state, reload: state.reload + 1, ...action.payload}
    }

    default:
      return state
  }
}


export {defaultState}
export default userReducer
