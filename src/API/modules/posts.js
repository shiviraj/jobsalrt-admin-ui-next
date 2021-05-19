import utils from '../utils'
import {METHODS} from "../constants";

const posts = (host = '') => {
  return {
    postsCount(currentPage, filters, sortBy, sortOrder) {
      const options = {data: {filters, sortBy, sortOrder}, method: METHODS.POST}
      return utils.fetch(`${host}/api/posts/posts-count`, options)
    },
    getPosts(currentPage, filters, sortBy, sortOrder) {
      const options = {data: {filters, sortBy, sortOrder}, method: METHODS.POST}
      return utils.fetch(`${host}/api/posts/page/${currentPage}`, options)
    },
    addNewPost(data) {
      const options = {data, method: METHODS.POST}
      return utils.fetch(`${host}/api/posts`, options)
    },
    deletePost(url) {
      const options = {method: METHODS.DELETE}
      return utils.fetch(`${host}/api/posts/${url}`, options)
    },
  }
}


export default posts
