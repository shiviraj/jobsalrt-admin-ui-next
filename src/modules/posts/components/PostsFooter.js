import {Typography} from "@material-ui/core";
import Pagination from "../../../common/components/Pagination";
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import store from "../../../store";
import {getPosts} from "../actions";

const useStyles = makeStyles(theme => ({
  paginationContainer: {display: "flex", justifyContent: "space-between", margin: theme.spacing(2)},
}));


const PostsFooter = () => {
  const classes = useStyles()
  const {posts} = store.getState()
  const [currentPage, setCurrentPage] = useState(posts.currentPage)
  const [totalPage, setTotalPage] = useState(posts.totalPage)

  store.subscribe(() => {
    const {posts} = store.getState()
    setCurrentPage(posts.currentPage)
    setTotalPage(posts.totalPage)
  })

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    store.dispatch(getPosts({currentPage}))
  }, [currentPage])

  return <div className={classes.paginationContainer}>
    <Typography variant="subtitle1">Page {currentPage} of {totalPage}</Typography>
    <Pagination count={totalPage} page={currentPage} onChange={handlePageChange}/>
    <div>-</div>
  </div>
}

export default PostsFooter
