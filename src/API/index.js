import user from "./modules/user";
import posts from "./modules/posts";
import post from "./modules/editPost";

const bffUrl = process.env.JOBSALRT_BFF_URL;

const init = () => {
  const API = {}
  API.user = user(bffUrl)
  API.posts = posts(bffUrl)
  API.post = post(bffUrl)
  return API
}

const API = init()
export default API
