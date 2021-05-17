import React, {useState} from 'react'
import {makeStyles} from "@material-ui/core/styles";
import PostContainer from "./components/PostContainer";
import FilterContainer from "./components/FilterContainer";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    backgroundColor: theme.palette.grey[300]
  },
}));

const Posts = () => {
  const classes = useStyles()
  const [filters, setFilters] = useState({})

  return <div className={classes.root}>
    <PostContainer filters={filters}/>
    <FilterContainer applyFilter={setFilters} selectedFilters={filters}/>
  </div>
}

export default Posts
