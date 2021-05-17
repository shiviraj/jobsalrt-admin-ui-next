// WORK AROUND TO FORCEFULLY SCROLL WINDOW TO TOP WHEN NAVIGATING BETWEEN PAGES
// THERE IS NO OFFICIAL NEXT JS CONFIGURATION AVAILABLE TO ACHIEVE THIS AS OF NOW

const handleRouteChange = () => window && window.scrollTo(0, 0)
const onRouteChange = () => {
  // Toast.DismissAll()
  handleRouteChange()
}

const redirectTo = path => {
  if (window.location.pathname === path) return
  window.location.assign(path)
}

export {onRouteChange, redirectTo}
