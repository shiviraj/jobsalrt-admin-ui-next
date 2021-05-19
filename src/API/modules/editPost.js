import utils from '../utils'
import {METHODS} from "../constants";

const posts = (host = '') => {
  return {
    getPost(url) {
      return utils.fetch(`${host}/api/posts/${url}`)
    },
    urlAvailable(url) {
      return utils.fetch(`${host}/api/posts/${url}/available`)
    },
    updatePost(post, url) {
      const options = {method: METHODS.PUT, data: post}
      return utils.fetch(`${host}/api/posts/${url || post.basicDetails.url}`, options)
    }
  }
}


export default posts
