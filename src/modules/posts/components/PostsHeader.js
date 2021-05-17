import {Typography} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import SortBy from "./SortBy";

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

const PostsHeader = ({page, count, sort, setSort}) => {
  const classes = useStyles()

  const limit = 48
  const start = Math.max((page - 1) * limit + 1, 0);
  const end = Math.min(count.totalPost, page * limit);

  return <React.Fragment>
    <div className={classes.titleContainer}>
      <div className={classes.titleContainer}>
        <Typography variant="h4">All Posts</Typography>
        <Typography variant="subtitle1" className={classes.postCounts}>
          (Showing {start} - {end} posts of {count.totalPost} posts)
        </Typography>
      </div>
      {/*<AddNewPost triggerReload={triggerReload}/>*/}
    </div>
    <SortBy sort={sort} setSort={setSort}/>
  </React.Fragment>
}

export default PostsHeader
