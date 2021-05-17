const ROUTES = {}

ROUTES.HOME = {
  url: '/',
  options: {nav: true}
}

ROUTES.LOGIN = {
  url: '/login',
  options: {skipUserValidation: true}
}

ROUTES.THANK_YOU = {
  url: '/thank-you',
  options: {skipUserValidation: true,}
}

ROUTES.ERROR = {
  url: '/error',
  options: {skipUserValidation: true,}
}


function serializeQueryParams(obj) {
  if (!Object.keys(obj).length) return ''

  return (
    '?' +
    Object.keys(obj)
      .reduce(function (a, k) {
        a.push(k + '=' + encodeURIComponent(obj[k]))
        return a
      }, [])
      .join('&')
  )
}

function getNextJsRoutes(url, params = {}, queryParams = {}) {
  const serializedQueryParams = serializeQueryParams(queryParams)

  const interpolatedUrl = Object.keys(params).reduce((urlString, paramKey) => {
    return urlString.replace(`[${paramKey}]`, params[paramKey])
  }, url)

  return {
    url: url + serializedQueryParams,
    as: interpolatedUrl + serializedQueryParams
  }
}

function matchUrl(urlConfig, path = "") {
  const urlComponents = urlConfig.split('/')
  const pathComponents = path.split('/')

  if (urlComponents.length !== pathComponents.length) return false

  return urlComponents.every((component, index) => {
    if (component.includes('[')) return true
    return component === pathComponents[index]
  })
}

function shouldValidateUserFor(pagePath) {
  const routeConfig = Object.values(ROUTES).find(({url: urlConfig}) => matchUrl(urlConfig, pagePath))
  return !(routeConfig && routeConfig.options && routeConfig.options.skipUserValidation)
}

export {ROUTES, getNextJsRoutes, shouldValidateUserFor}