import {Cmd, loop} from "redux-loop";
import {
  GET_POSTS,
  GET_POSTS_ERROR,
  GET_POSTS_SUCCESS,
  getPostsError,
  getPostsSuccess,
  POSTS_COUNT,
  POSTS_COUNT_ERROR,
  POSTS_COUNT_SUCCESS,
  postsCountError,
  postsCountSuccess
} from "./actions";
import API from "../../API";

export const SORT = {
  sortBy: {
    CREATED_AT: "createdAt",
    TOTAL_VIEWS: "totalViews",
    POST_UPDATE_DATE: "postUpdateDate",
    get(index) {
      if (index === 0) return this.CREATED_AT
      if (index === 1) return this.TOTAL_VIEWS
      return this.POST_UPDATE_DATE
    }
  },
  sortOrder: {
    DESC: "DESC",
    ASC: "ASC",
    toggleSortOrder(order) {
      return (order === this.DESC) ? this.ASC : this.DESC
    }
  }
}

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
  sortOrder: SORT.sortOrder.DESC
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

    default:
      return state
  }
}


export {defaultState}
export default userReducer
