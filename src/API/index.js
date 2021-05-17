import user from "./modules/user";

let API = {}
let API_OPTIONS = {}

export const init = options => {
  API_OPTIONS = {...options}
  API_OPTIONS.JOBSALRT_ADMIN_BFF_BASE_URL = "http://localhost:3001"
  API.user = user(API_OPTIONS.JOBSALRT_ADMIN_BFF_BASE_URL)
}

init()

export default API
