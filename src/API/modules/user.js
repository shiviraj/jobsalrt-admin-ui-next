import utils from '../utils'
import {METHODS} from "../constants";

const user = (host = '') => {
  return {
    login(payload) {
      const options = {data: payload, method: METHODS.POST}
      return utils.fetch(`${host}/api/user/sign-in`, options)
    },
    validateUser() {
      return utils.fetch(`${host}/api/user/validate`, {method: METHODS.GET})
    }
  }
}


export default user
