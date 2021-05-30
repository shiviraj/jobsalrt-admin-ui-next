import {METHODS} from "../constants";
import axios from "../axios";

const user = (host = '') => {
  return {
    login(payload) {
      const options = {data: payload, method: METHODS.POST}
      return axios.fetch(`${host}/api/user/sign-in`, options)
    },
    validateUser() {
      return axios.fetch(`${host}/api/user/validate`)
    }
  }
}


export default user
