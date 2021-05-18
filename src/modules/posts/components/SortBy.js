import React, {useEffect, useState} from "react";
import {Tab, Tabs, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import store from "../../../store";
import {SORT} from "../reducer";
import {getPosts} from "../actions";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(0, 4),
    display: "flex",
    alignItems: "center",
  },
  tab: {marginLeft: theme.spacing(4)}
}))

const options = [
  {key: "createdAt", name: "Created At"},
  {key: "totalViews", name: "Popularity"},
  {key: "postUpdateDate", name: "Post Update Date"},
]

const SortBy = () => {
  const classes = useStyles()
  const {posts} = store.getState()

  const [activeTab, setActiveTab] = useState(0)
  const [sortBy, setSortBy] = useState(posts.sortBy)
  const [sortOrder, setSortOrder] = useState(posts.sortOrder)

  const handleSetSort = (index) => {
    if (index === activeTab) setSortOrder(SORT.sortOrder.toggleSortOrder(sortOrder))
    else setSortBy(SORT.sortBy.get(index))
    setActiveTab(index)
  }

  useEffect(() => {
    store.dispatch(getPosts({sortOrder, sortBy, currentPage: 1}))
  }, [sortBy, sortOrder])

  const symbol = sortOrder === SORT.sortOrder.DESC ? "▼" : "▲"

  return <div className={classes.root}>
    <Typography variant="h6">Sort By </Typography>
    <Tabs value={activeTab}
          indicatorColor="primary"
          textColor="primary"
          onChange={(e, value) => handleSetSort(value)}>
      {
        options.map((option, index) => {
            const label = `${option.name} ${activeTab === index ? symbol : ""}`
            return <Tab className={classes.tab} key={`key-${index}`} label={label}/>;
          }
        )
      }
    </Tabs>
  </div>
}

export default SortBy
