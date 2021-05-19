import {Cmd, loop} from "redux-loop";

import {GET_POST, GET_POST_ERROR, GET_POST_SUCCESS, getPostError, getPostSuccess, SAVE_POST} from "./actions";
import API from "../../API";

const defaultState = () => ({
  loading: false,
  error: false,
  errorMessage: null,
  data: null,
  url: ""
})

const userReducer = (state = defaultState(), action) => {
  switch (action.type) {

    case GET_POST:
      state = {...state, loading: true, error: false, errorMessage: null}
      return loop(state,
        Cmd.run(API.post.getPost, {
          args: [action.payload],
          successActionCreator: getPostSuccess,
          failActionCreator: getPostError
        })
      )

    case GET_POST_SUCCESS: {
      const {data} = action.payload
      return {...state, loading: false, data, url: data.basicDetails?.url}
    }

    case GET_POST_ERROR: {
      return {...state, error: true, loading: false, errorMessage: "Unable to fetch post. Try Again"}
    }

    case SAVE_POST:
      return {...state, data: {...state.data, ...action.payload}}

    default:
      return state
  }
}


export {defaultState}
export default userReducer
