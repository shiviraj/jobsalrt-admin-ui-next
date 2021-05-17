import React, {useEffect, useState} from "react";
import {Tab, Tabs, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(0, 4),
    display: "flex",
    alignItems: "center",
  },
  tab: {
    marginLeft: theme.spacing(4)
  }
}))

const options = [
  {key: "createdAt", name: "Created At"},
  {key: "totalViews", name: "Popularity"},
  {key: "postUpdateDate", name: "Post Update Date"},
]

const SortBy = ({sort, setSort}) => {
  const classes = useStyles()
  const [activeTab, setActiveTab] = useState(0)
  const [sortBy, setSortBy] = useState(sort.sortBy)
  const [sortOrder, setSortOrder] = useState(sort.sortOrder)

  const toggleSortOrder = () => setSortOrder(sortOrder === 'desc' ? "asc" : "desc")

  const handleSetSort = (index) => {
    if (index === activeTab) toggleSortOrder()
    else setSortBy(options[index].key)
    setActiveTab(index)
  }

  useEffect(() => {
    setSort({sortBy, sortOrder})
  }, [sortOrder, sortBy, setSort])

  const symbol = sortOrder === "desc" ? "▼" : "▲"

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
