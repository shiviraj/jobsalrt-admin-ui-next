const UNDEFINED = 'undefined'

function storageLocation() {
  return 'sessionStorage'
}

function setStorage(key, value) {
  if (typeof window === UNDEFINED) return
  window[storageLocation()].setItem(key, value)
}

function getStorage(key) {
  if (typeof window === UNDEFINED) return

  const result = window[storageLocation()].getItem(key)
  if (!!result && result !== UNDEFINED) {
    return JSON.parse(result)
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
