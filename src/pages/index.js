import {useToast} from "../common/components/ToastWrapper";

const Home = () => {
  const toast = useToast();
  toast.success("Hello I am toast")
  return (<div>Home</div>);
};

export default Home
