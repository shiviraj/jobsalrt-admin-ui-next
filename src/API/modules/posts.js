import {METHODS} from "../constants";
import axios from "../axios";

const posts = (host = '') => {
  return {
    postsCount(search, filters, sortBy, sortOrder) {
      const options = {data: {filters, sortBy, sortOrder, search}, method: METHODS.POST}
      return axios.fetch(`${host}/api/posts/posts-count`, options)
    },
    getPosts(currentPage, filters, sortBy, sortOrder, search) {
      const options = {data: {filters, sortBy, sortOrder, search}, method: METHODS.POST}
      return axios.fetch(`${host}/api/posts/page/${currentPage}`, options)
    },
    addNewPost(data) {
      const options = {data, method: METHODS.POST}
      return axios.fetch(`${host}/api/posts`, options)
    },
    deletePost(url) {
      const options = {method: METHODS.DELETE}
      return axios.fetch(`${host}/api/posts/${url}`, options)
    },
  }
}


export default posts
