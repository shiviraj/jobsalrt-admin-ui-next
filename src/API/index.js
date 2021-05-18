import user from "./modules/user";
import posts from "./modules/posts";

const bffUrl = process.env.JOBSALRT_BFF_URL || "http://localhost:3001";

const init = () => {
  const API = {}
  API.user = user(bffUrl)
  API.posts = posts(bffUrl)
  return API
}

const API = init()
export default API
