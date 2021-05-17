import API from '../API'
import {clearStorage, getStorage} from './storage'
import {ROUTES} from '../config/routes'
import {redirectTo} from './routing'
import {SessionStorageKeys} from '../constants/storage'

const logout = () => {
  return API.auth.logout().then(() => {
    clearStorage()
  })
}

const logoutAndRedirectTo = url => {
  return logout().then(() => {
    redirectTo(url)
  })
}

const logoutUser = (url = ROUTES.THANK_YOU.url) => logoutAndRedirectTo(url)

const forcedLogoutUser = () => logoutAndRedirectTo(ROUTES.LOGGED_OUT.url)

const isUserLoggedIn = () => {
  return Boolean(getStorage(SessionStorageKeys.AUTH))
}

const handleUnauthorized = () => {
  clearStorage()
  return redirectTo(ROUTES.LOGIN.url)
};

const getLoginSource = () => getStorage(SessionStorageKeys.LOGIN_SOURCE)
export {logoutUser, forcedLogoutUser, isUserLoggedIn, handleUnauthorized, getLoginSource}
