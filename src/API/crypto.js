import crypto from "crypto";

const algorithm = 'aes-256-ctr';
export const iv = crypto.randomBytes(16)

const getSecretKey = (authToken) => authToken.slice(0, 32);

const encryptRequestPayload = (key, params) => {
  params = JSON.stringify(params)
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([cipher.update(params), cipher.final()]);
  return encrypted.toString('hex')
};

const decryptResponseObject = (key, content) => {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  const contentBuffer = Buffer.from(content, 'hex');
  const decrypted = Buffer.concat([decipher.update(contentBuffer), decipher.final()]);
  const str = decrypted.toString();
  return JSON.parse(str)
};

const encryptRequest = (data, headers) => {
  const disableEncryption = headers['disable-encryption']
  if (data && !disableEncryption) {
    const key = getSecretKey(headers.authorization)
    return {payload: encryptRequestPayload(key, data)}
  }
  return data
}

const decryptResponse = (data, headers) => {
  const disableEncryption = headers['disable-encryption']
  if (data && data.payload && !disableEncryption) {
    const key = getSecretKey(headers.authorization)
    return decryptResponseObject(key, data.payload)
  }
  return data
}

export {encryptRequest, decryptResponse}
