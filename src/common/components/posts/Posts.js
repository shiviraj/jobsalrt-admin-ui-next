import React, {useState} from 'react'
import {makeStyles} from "@material-ui/core/styles";
import theme from "../../theme/theme";
import PostContainer from "./PostContainer";
import FilterContainer from "./FilterContainer";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    backgroundColor: theme.palette.grey[300]
  },
});

const Posts = () => {
  const classes = useStyles()
  const [filters, setFilters] = useState({})

  return <div className={classes.root}>
    <PostContainer filters={filters}/>
    <FilterContainer applyFilter={setFilters} selectedFilters={filters}/>
  </div>
}

export default Posts
