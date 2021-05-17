import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Divider, Typography} from "@material-ui/core";
import SortBy from "./SortBy";
import Post from "./Post";
import Pagination from "../../../common/components/Pagination";
import PostSkeleton from "../../../common/components/PostSkeleton";

const useStyles = makeStyles(theme => ({
  root: {width: '80%', backgroundColor: theme.palette.common.white, paddingTop: theme.spacing(2)},
  titleContainer: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(4),
  },
  postCounts: {marginLeft: theme.spacing(2)},
  postContainer: {display: "flex", flexWrap: "wrap", justifyContent: 'center',},
  noPost: {margin: theme.spacing(20), color: theme.palette.error.light},
  paginationContainer: {display: "flex", justifyContent: "space-between", margin: theme.spacing(2)},
  divider: {marginTop: theme.spacing(2), marginBottom: theme.spacing(2)}
}));

const TitleBar = ({page, count}) => {
  const classes = useStyles()

  const limit = 48
  const start = (page - 1) * limit + 1;
  const end = (page * limit) > count.totalPost ? count.totalPost : page * limit;

  return <div className={classes.titleContainer}>
    <Typography variant="h4">All Posts</Typography>
    <Typography variant="subtitle1" className={classes.postCounts}>
      (Showing {start} - {end} posts of {count.totalPost} posts)
    </Typography>
  </div>
}

const PostsContents = ({posts, triggerReload}) => {
  const classes = useStyles()
  if (!posts) return Array(12).fill("").map((_, index) => <PostSkeleton key={`key-${index}`}/>)
  return posts && posts.length
    ? posts.map((post, index) => <Post post={post} key={`${post.source}_${index}`} triggerReload={triggerReload}/>)
    : <Typography variant="h1" className={classes.noPost}>No Post Found...</Typography>
}

const PostContainer = ({filters}) => {
  const classes = useStyles()

  const [posts, setPosts] = useState(null)
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState({})
  const [sort, setSort] = useState({sortBy: "createdAt", sortOrder: "desc"})

  const getPostsBasedOnFiltersAndSort = (pageNo) => {
    setPosts(null)
    // return fetchApi({type: "GET_POSTS", payload: {page: pageNo, filters, ...sort}})
    //   .then(posts => setPosts(posts))
    //   .catch(e => ({}))
  };

  const getPostsPageCount = () => {
    // fetchApi({type: "GET_POSTS_PAGE_COUNT", payload: {filters, ...sort}})
    //   .then((pageCount) => setPageCount(pageCount))
    //   .catch(e => ({}))
  };

  const triggerReload = () => {
    getPostsPageCount()
    // getPostsBasedOnFiltersAndSort(1).then(() => setPage(1))
  }

  useEffect(() => {
    getPostsPageCount();
    // getPostsBasedOnFiltersAndSort(1).then(() => setPage(1))
  }, [filters, sort])

  useEffect(() => {
    // getPostsBasedOnFiltersAndSort(page).then(() => ({}))
  }, [page])

  return <div className={classes.root}>
    <div className={classes.titleContainer}>
      <TitleBar page={page} count={pageCount}/>
      {/*<AddNewPost triggerReload={triggerReload}/>*/}
    </div>
    <SortBy sort={sort} setSort={setSort}/>
    <Divider className={classes.divider}/>

    <div className={classes.postContainer}>
      <PostsContents posts={posts} triggerReload={triggerReload}/>
    </div>

    <Divider className={classes.divider}/>
    <div className={classes.paginationContainer}>
      <Typography variant="subtitle1">Page {page} of {pageCount.page}</Typography>
      <Pagination count={pageCount.page} page={page} onChange={(e, page) => setPage(page)}/>
      <div>-</div>
    </div>
  </div>
}

export default PostContainer
