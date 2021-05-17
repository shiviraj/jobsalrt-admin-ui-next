import React from "react";
import {Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import PostSkeleton from "../../../common/components/PostSkeleton";
import Post from "./Post";

const useStyles = makeStyles(theme => ({
  noPost: {margin: theme.spacing(20), color: theme.palette.error.light},
}));

const AllPosts = ({posts, triggerReload}) => {
  const classes = useStyles()
  if (!posts) return Array(12).fill("").map((_, index) => <PostSkeleton key={`key-${index}`}/>)
  return posts && posts.length
    ? posts.map((post, index) => <Post post={post} key={`${post.source}_${index}`} triggerReload={triggerReload}/>)
    : <Typography variant="h1" className={classes.noPost}>No Post Found...</Typography>
}


export default AllPosts
