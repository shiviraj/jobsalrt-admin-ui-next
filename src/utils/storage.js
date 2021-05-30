const UNDEFINED = 'undefined'

function storageLocation() {
  return 'localStorage'
}

function setStorage(key, value) {
  if (typeof window === UNDEFINED) return
  value = Buffer.from(JSON.stringify(value), "ascii").toString("base64")
  window[storageLocation()].setItem(key, value)
}

function getStorage(key) {
  if (typeof window === UNDEFINED) return

  const result = window[storageLocation()].getItem(key)
  if (!!result && result !== UNDEFINED) {
    const data = Buffer.from(result, "base64").toString("ascii")
    return JSON.parse(data)
  }
  return UNDEFINED
}

function clearStorage() {
  if (typeof window === UNDEFINED) return
  window[storageLocation()].clear()
}

function removeFromStorage(key) {
  if (typeof window === UNDEFINED) return
  window[storageLocation()].removeItem(key)
}

export {setStorage, getStorage, clearStorage, removeFromStorage}
