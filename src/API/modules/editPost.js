import utils from '../utils'
import {METHODS} from "../constants";

const post = (host = '') => {
  return {
    getPost(url) {
      return utils.fetch(`${host}/api/post/${url}`)
    },

    urlAvailable(url) {
      return utils.fetch(`${host}/api/post/${url}/available`)
    },

    updatePost(post, url) {
      const options = {method: METHODS.PUT, data: post}
      return utils.fetch(`${host}/api/post/${url || post.basicDetails.url}`, options)
    },

    getUpdates(url) {
      return utils.fetch(`${host}/api/post/${url}/update`)
    }
  }
}


export default post
