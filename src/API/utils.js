import axios from "axios";
import store from "../store";

const utils = {
  fetch(url, options = {}) {
    return new Promise((resolve, reject) => {
      const {headers = {}} = options
      headers.Authorization = store.getState().user.token

      axios({url, ...options, headers})
        .then(resolve)
        .catch((error) => {
          if (error.response.status === 401) {
            console.log(error)
          }
          reject(error)
        })
    })
  }
}

export default utils
