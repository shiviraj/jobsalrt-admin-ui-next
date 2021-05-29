import React, {useEffect} from 'react'
import {makeStyles} from "@material-ui/core/styles";
import PostsContainer from "./components/PostsContainer";
import FilterContainer from "./components/FilterContainer";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: theme.spacing(1),
    backgroundColor: theme.palette.grey[300]
  },
}));

const Posts = (props) => {
  const {filters, postsCount, getPosts, search} = props
  const classes = useStyles()

  useEffect(() => {
    postsCount()
    getPosts()
  }, [search])

  return <div className={classes.root}>
    <PostsContainer {...props}/>
    <FilterContainer filters={filters} getPosts={getPosts} postsCount={postsCount}/>
  </div>
}

export default Posts
