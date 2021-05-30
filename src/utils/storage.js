const UNDEFINED = 'undefined'

function storageLocation() {
  return 'localStorage'
}

function setStorage(key, value) {
  if (typeof window === UNDEFINED) return
  value = new Buffer(JSON.stringify(value), "ascii").toString("base64")
  window[storageLocation()].setItem(key, value)
}

function getStorage(key) {
  if (typeof window === UNDEFINED) return

  const result = window[storageLocation()].getItem(key)
  if (!!result && result !== UNDEFINED) {
    const data = new Buffer(result, "base64").toString("ascii")
    return JSON.parse(data)
  }

  return undefined
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
