import {Typography} from "@material-ui/core";
import Pagination from "../../../common/components/Pagination";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  paginationContainer: {display: "flex", justifyContent: "space-between", margin: theme.spacing(2)},
}));


const PostsFooter = ({currentPage, totalPage, getPosts}) => {
  const classes = useStyles()
  return <div className={classes.paginationContainer}>
    <Typography variant="subtitle1">Page {currentPage} of {totalPage}</Typography>
    <Pagination count={totalPage} page={currentPage} onChange={(currentPage) => getPosts({currentPage})}/>
    <div>-</div>
  </div>
}

export default PostsFooter
