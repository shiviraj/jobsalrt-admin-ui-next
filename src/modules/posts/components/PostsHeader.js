import {Typography} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import SortBy from "./SortBy";
import AddNewPost from "./AddNewPost";

const useStyles = makeStyles(theme => ({
  titleContainer: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    margin: theme.spacing(0, 1, -1, 1),

  },
  postCounts: {marginLeft: theme.spacing(1)},
}));

const PostsHeader = ({currentPage, totalPosts, getPosts, sortBy, sortOrder, postsCount}) => {
  const classes = useStyles()

  const limit = 48
  const start = Math.min(totalPosts, (currentPage - 1) * limit + 1);
  const end = Math.min(totalPosts, currentPage * limit);

  return <React.Fragment>
    <div className={classes.titleContainer}>
      <div className={classes.titleContainer}>
        <Typography variant="h5">All Posts</Typography>
        <Typography variant="subtitle2" className={classes.postCounts}>
          (Showing {start} - {end} posts of {totalPosts} posts)
        </Typography>
      </div>
      <AddNewPost getPosts={getPosts} postsCount={postsCount}/>
    </div>
    <SortBy getPosts={getPosts} sortBy={sortBy} sortOrder={sortOrder}/>
  </React.Fragment>
}

export default PostsHeader
