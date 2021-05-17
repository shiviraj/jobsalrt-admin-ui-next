import utils from '../utils'
import {METHODS} from "../constants";

const user = (host = '') => {
  return {
    login(payload) {
      const options = {data: payload, method: METHODS.POST}
      return utils.fetch(`${host}/api/user/sign-in`, options)
    },
    validateUser(payload) {
      const options = {data: payload, method: METHODS.POST}
      return utils.fetch(`${host}/api/user/sign-in`, options)
    }
  }
}


export default user
