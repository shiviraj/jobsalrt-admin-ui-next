import {Typography} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import SortBy from "./SortBy";
import AddNewPost from "./AddNewpPost";

const useStyles = makeStyles(theme => ({
  titleContainer: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(4),
  },
  postCounts: {marginLeft: theme.spacing(2)},
}));

const PostsHeader = ({currentPage, totalPosts, addNewPost, loading, reloadPosts, getPosts, sortBy, sortOrder}) => {
  const classes = useStyles()

  const limit = 48
  const start = Math.min(totalPosts, (currentPage - 1) * limit + 1);
  const end = Math.min(totalPosts, currentPage * limit);

  return <React.Fragment>
    <div className={classes.titleContainer}>
      <div className={classes.titleContainer}>
        <Typography variant="h4">All Posts</Typography>
        <Typography variant="subtitle1" className={classes.postCounts}>
          (Showing {start} - {end} posts of {totalPosts} posts)
        </Typography>
      </div>
      <AddNewPost addNewPost={addNewPost} loading={loading} reloadPosts={reloadPosts}/>
    </div>
    <SortBy getPosts={getPosts} sortBy={sortBy} sortOrder={sortOrder}/>
  </React.Fragment>
}

export default PostsHeader
