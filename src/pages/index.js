import {useToast} from "../common/components/ToastWrapper";

const Home = () => {
  const toast = useToast();
  toast.success("Hello Human, Now you are on Jobsalrt Admin Home page ")
  return (<div>Home</div>);
};

export default Home
