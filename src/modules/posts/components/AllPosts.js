import React, {useEffect, useState} from "react";
import {Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import PostSkeleton from "../../../common/components/PostSkeleton";
import Post from "./Post";
import store from "../../../store";
import {getPosts} from "../actions";

const useStyles = makeStyles(theme => ({
  noPost: {margin: theme.spacing(20), color: theme.palette.error.light},
}));

const AllPosts = () => {
  const classes = useStyles()
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    store.dispatch(getPosts())
  }, [])

  store.subscribe(() => {
    setPosts(store.getState().posts.data)
  })

  if (!posts) return Array(12).fill("").map((_, index) => <PostSkeleton key={`key-${index}`}/>)
  return posts && posts.length
    ? posts.map((post, index) => <Post post={post} key={`${post.source}_${index}`}/>)
    : <Typography variant="h1" className={classes.noPost}>No Post Found...</Typography>
}


export default AllPosts
