import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Divider} from "@material-ui/core";
import PostsHeader from "./PostsHeader";
import AllPosts from "./AllPosts";
import PostsFooter from "./PostsFooter";

const useStyles = makeStyles(theme => ({
  root: {width: '80%', backgroundColor: theme.palette.common.white, paddingTop: theme.spacing(2)},
  postContainer: {display: "flex", flexWrap: "wrap", justifyContent: 'center',},
  divider: {marginTop: theme.spacing(2), marginBottom: theme.spacing(2)}
}));


const PostsContainer = ({filters}) => {
  const classes = useStyles()

  // const [posts, setPosts] = useState(null)
  // const [page, setPage] = useState(0)
  // const [pageCount, setPageCount] = useState({})
  // const [sort, setSort] = useState({sortBy: "createdAt", sortOrder: "desc"})

  // const getPostsBasedOnFiltersAndSort = (pageNo) => {
  //   setPosts(null)
  //   // return fetchApi({type: "GET_POSTS", payload: {page: pageNo, filters, ...sort}})
  //   //   .then(posts => setPosts(posts))
  //   //   .catch(e => ({}))
  // };
  //
  // const getPostsPageCount = () => {
  //   // fetchApi({type: "GET_POSTS_PAGE_COUNT", payload: {filters, ...sort}})
  //   //   .then((pageCount) => setPageCount(pageCount))
  //   //   .catch(e => ({}))
  // };
  //
  // const triggerReload = () => {
  //   getPostsPageCount()
  //   // getPostsBasedOnFiltersAndSort(1).then(() => setPage(1))
  // }
  //
  // useEffect(() => {
  //   getPostsPageCount();
  //   // getPostsBasedOnFiltersAndSort(1).then(() => setPage(1))
  // }, [filters, sort])
  //
  // useEffect(() => {
  //   // getPostsBasedOnFiltersAndSort(page).then(() => ({}))
  // }, [page])

  return <div className={classes.root}>
    <PostsHeader/>
    <Divider className={classes.divider}/>

    <div className={classes.postContainer}>
      <AllPosts/>
    </div>

    <Divider className={classes.divider}/>
    <PostsFooter/>
  </div>
}

export default PostsContainer
