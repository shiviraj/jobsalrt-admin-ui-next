import axios from "axios";
import {getStorage} from "../utils/storage";
import {StorageKeys} from "../constants/storage";
import {handleUnauthorized} from "../utils/auth";
import {decryptResponse, encryptRequest, iv} from "./crypto";

export const defaultHeaders = {'Content-Type': 'application/json'}

const init = () => {
  const auth = getStorage(StorageKeys.AUTH)
  const authToken = auth ? auth.token : "defaultsecretkeydefaultsecretkey"
  const encryptionDisabled = process.env.DISABLE_ENCRYPTION || false;
  const headers = encryptionDisabled ? {'disable-encryption': encryptionDisabled} : {}
  return {...defaultHeaders, ...headers, iv: iv.toString("hex"), authorization: authToken}
}

const utils = {
  fetch(url, {data, ...options} = {}) {
    return new Promise((resolve, reject) => {
        const headers = init()
        const payload = encryptRequest(data, headers)
        axios({url, ...options, headers: {...headers, ...options.headers}, data: payload})
          .then((res) => {
            resolve(decryptResponse(res.data, headers))
          })
          .catch((error) => {
            if (error.response && error.response.status === 403) {
              return handleUnauthorized()
            }
            reject(error)
          })
      }
    )
  }
}

export default utils
