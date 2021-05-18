import React, {useEffect} from 'react'
import {makeStyles} from "@material-ui/core/styles";
import PostsContainer from "./components/PostsContainer";
import FilterContainer from "./components/FilterContainer";
import store from "../../store";
import {postsCount} from "./actions";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    backgroundColor: theme.palette.grey[300]
  },
}));

const Posts = () => {
  const classes = useStyles()

  useEffect(() => {
    store.dispatch(postsCount())
  }, [])

  return <div className={classes.root}>
    <PostsContainer/>
    <FilterContainer/>
  </div>
}

export default Posts
