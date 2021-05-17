import axios from "axios";
import {useState} from "react";

const Home = () => {
  const [email, setEmail] = useState(null)
  axios({url: "http://localhost:3001/api/user/validate"}).then((d) => {
    setEmail(d.data.email)
  }).catch(console.log)

  return (<div>Home {JSON.stringify(email)} </div>);
};

export default Home
