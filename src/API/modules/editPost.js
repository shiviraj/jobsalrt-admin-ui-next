import {METHODS} from "../constants";
import axios from "../axios";

const post = (host = '') => {
  return {
    getPost(url) {
      return axios.fetch(`${host}/api/post/${url}`)
    },

    urlAvailable(url) {
      return axios.fetch(`${host}/api/post/${url}/available`)
    },

    updatePost(post, url) {
      const options = {method: METHODS.PUT, data: post}
      return axios.fetch(`${host}/api/post/${url || post.basicDetails.url}`, options)
    },

    getUpdates(url) {
      return axios.fetch(`${host}/api/post/${url}/update`)
    }
  }
}


export default post
