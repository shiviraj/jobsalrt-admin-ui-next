import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Divider} from "@material-ui/core";
import PostsHeader from "./PostsHeader";
import AllPosts from "./AllPosts";
import PostsFooter from "./PostsFooter";

const useStyles = makeStyles(theme => ({
  root: {width: '81.5%', backgroundColor: theme.palette.common.white, paddingTop: theme.spacing(1)},
  postContainer: {display: "flex", flexWrap: "wrap", justifyContent: 'center',},
  divider: {margin: theme.spacing(1, 0)}
}));

const PostsContainer = (props) => {
  const {currentPage, totalPosts, totalPage, getPosts, posts, loading, sortBy, sortOrder, postsCount} = props
  const classes = useStyles()

  return <div className={classes.root}>
    <PostsHeader currentPage={currentPage} totalPosts={totalPosts} sortOrder={sortOrder}
                 sortBy={sortBy} getPosts={getPosts} postsCount={postsCount}
    />
    <Divider className={classes.divider}/>

    <div className={classes.postContainer}>
      <AllPosts posts={posts} loading={loading} getPosts={getPosts} postsCount={postsCount}/>
    </div>

    <Divider className={classes.divider}/>
    <PostsFooter currentPage={currentPage} totalPage={totalPage} getPosts={getPosts}/>
  </div>
}

export default PostsContainer
