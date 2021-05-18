import {Typography} from "@material-ui/core";
import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import SortBy from "./SortBy";
import store from "../../../store";

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

const PostsHeader = () => {
  const classes = useStyles()
  const {posts} = store.getState()
  const [page, setPage] = useState(posts.currentPage)

  store.subscribe(() => {
    const {posts} = store.getState()
    setPage(posts.currentPage)
  })

  const limit = 48
  const start = Math.max((page - 1) * limit + 1, 0);
  const end = Math.min(posts.totalPosts, page * limit);

  return <React.Fragment>
    <div className={classes.titleContainer}>
      <div className={classes.titleContainer}>
        <Typography variant="h4">All Posts</Typography>
        <Typography variant="subtitle1" className={classes.postCounts}>
          (Showing {start} - {end} posts of {posts.totalPosts} posts)
        </Typography>
      </div>
      {/*<AddNewPost triggerReload={triggerReload}/>*/}
    </div>
    <SortBy/>
  </React.Fragment>
}

export default PostsHeader
