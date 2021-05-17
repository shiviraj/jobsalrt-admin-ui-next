import {Typography} from "@material-ui/core";
import Pagination from "../../../common/components/Pagination";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  paginationContainer: {display: "flex", justifyContent: "space-between", margin: theme.spacing(2)},
}));


const PostsFooter = ({page, pageCount, setPage}) => {
  const classes = useStyles()
  return <div className={classes.paginationContainer}>
    <Typography variant="subtitle1">Page {page} of {pageCount.page}</Typography>
    <Pagination count={pageCount.page} page={page} onChange={(e, page) => setPage(page)}/>
    <div>-</div>
  </div>
}

export default PostsFooter
