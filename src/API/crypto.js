import crypto from "crypto";

const algorithm = 'aes-256-ctr';
export const iv = crypto.randomBytes(16)

const getSecretKey = (authToken, defaultToken = false) => {
  return defaultToken ? "defaultsecretkeydefaultsecretkey" : authToken.slice(0, 32);
};

const encryptRequestPayload = (key, iv, params) => {
  params = JSON.stringify(params)
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([cipher.update(params), cipher.final()]);
  return encrypted.toString('hex')
};

const decryptResponseObject = (key, iv, content) => {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  const contentBuffer = Buffer.from(content, 'hex');
  const decrypted = Buffer.concat([decipher.update(contentBuffer), decipher.final()]);
  const str = decrypted.toString();
  return JSON.parse(str)
};

const initCrypto = authToken => {
  const secretKey = getSecretKey(authToken)
  return {
    encrypt: encryptRequestPayload.bind(null, secretKey, iv),
    decrypt: decryptResponseObject.bind(null, secretKey, iv)
  }
}


const initEncryption = authToken => {
  const {encrypt, decrypt} = initCrypto(authToken)

  const encryptRequest = (config) => {
    const data = config.data
    const disableEncryption = config.headers['disable-encryption']
    if (data && !disableEncryption) {
      config.data = {payload: encrypt(data)}
    }
    return config
  }

  const decryptResponse = (config) => {
    if (config.data && !(config.config && config.config.disableEncryption)) {
      config.data = decrypt(config.data.payload)
    }
    return config
  }

  return {encryptRequest, decryptResponse}
}

export {initEncryption, initCrypto, decryptResponseObject, encryptRequestPayload,}
