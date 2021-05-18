import axios, {initAxios} from "./axios";
import {getStorage} from "../utils/storage";
import {SessionStorageKeys} from "../constants/storage";
import {handleUnauthorized} from "../utils/auth";
import {iv} from "./crypto";

export const defaultHeaders = {'Content-Type': 'application/json'}

const init = () => {
  const auth = getStorage(SessionStorageKeys.AUTH)
  const authToken = auth ? auth.token : ""
  const encryptionDisabled = process.env.DISABLE_ENCRYPTION || true;
  initAxios(authToken, encryptionDisabled)
  const headers = encryptionDisabled ? {'disable-encryption': encryptionDisabled} : {}
  return {...defaultHeaders, ...headers, iv: iv.toString("hex"), Authorization: authToken}
}

const utils = {
  fetch(url, options = {}) {
    return new Promise((resolve, reject) => {
      axios({url, ...options, headers: {...init(), ...options.headers}})
        .then(resolve)
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            return handleUnauthorized()
          }
          reject(error)
        })
    })
  }
}

export default utils
