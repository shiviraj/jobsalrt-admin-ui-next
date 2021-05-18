import React, {useState} from "react";
import {Tab, Tabs, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {SORT} from "../../../constants/sort";

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

const SortBy = ({getPosts, sortBy, sortOrder}) => {
  const classes = useStyles()
  const [activeTab, setActiveTab] = useState(options.findIndex(opt => opt.key === sortBy))

  const handleSetSort = (index) => {
    const sort = {}
    if (index === activeTab) sort.sortOrder = SORT.sortOrder.toggleSortOrder(sortOrder)
    else sort.sortBy = SORT.sortBy.get(index)
    setActiveTab(index)
    getPosts({...sort, currentPage: 1})
  }

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
