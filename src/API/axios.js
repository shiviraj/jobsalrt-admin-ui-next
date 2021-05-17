import axios from 'axios'
import axiosRetry from "axios-retry";
import {initEncryption} from "./crypto";

const initAxios = (authToken, isEncryptionDisabled) => {
  if (authToken && !isEncryptionDisabled) {
    const {encryptRequest, decryptResponse} = initEncryption(authToken)

    const axiosErrorHandler = error => {
      error.response = decryptResponse(error.response)
      return Promise.reject(error)
    };

    axios.interceptors.request.use(encryptRequest, axiosErrorHandler)

    axios.interceptors.response.use(decryptResponse, axiosErrorHandler)
  }

  axiosRetry(axios, {
    retries: 3,
    retryCondition: error => !!error.config.shouldRetry
  })
}

export {initAxios}

export default axios
