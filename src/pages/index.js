import React from "react";
import store from "../store";
import {setFilters} from "../modules/posts/actions";
import Home from "../modules/home";

const HomePage = () => {
  const setFilter = (filters) => store.dispatch(setFilters(filters))
  return <Home setFilters={setFilter}/>
}

export default HomePage

