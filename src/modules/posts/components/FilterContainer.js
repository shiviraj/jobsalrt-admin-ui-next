import React, {useCallback, useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Chip, Divider, Typography} from "@material-ui/core";
import FilterOptions from "./FilterOptions";
import {Close} from "@material-ui/icons";
import store from "../../../store";
import {getPosts, postsCount} from "../actions";

const useStyles = makeStyles(theme => ({
    root: {
      width: '18%',
      backgroundColor: theme.palette.common.white,
      paddingTop: theme.spacing(2),
    },
    titleBar: {
      display: "flex",
      justifyContent: "space-between",
      padding: theme.spacing(0, 2)
    },
    title: {marginBottom: theme.spacing(1)},
    filter: {backgroundColor: theme.palette.grey[300], margin: theme.spacing(0.5)},
    divider: {marginTop: theme.spacing(2)}
  }))
;


const SelectedOptions = ({filters, classes, onclick}) => {
  return Object.keys(filters).map((keyName) =>
    filters[keyName].map((value, index) => {
        const options = filterOptions[keyName].find(opt => opt.value === value);
        return <Button variant="contained"
                       key={`${keyName}_${index}`}
                       onClick={() => onclick(keyName, value)}
                       className={classes.filter}>
          <Close fontSize="small"/>&nbsp; {options.name}
        </Button>;
      }
    )
  )
};

const filterOptions = {
  status: [
    {name: "Verified", value: "VERIFIED"},
    {name: "Not Verified", value: "NOT_VERIFIED"},
    {name: "Disabled", value: "DISABLED"}
  ],
  formType: [
    {name: "Online", value: "ONLINE"},
    {name: "Offline", value: "OFFLINE"}
  ],
  type: [
    {name: "Latest Job", value: "LATEST_JOB"},
    {name: "Admit Card", value: "ADMIT_CARD"},
    {name: "Result", value: "RESULT"},
    {name: "Syllabus", value: "SYLLABUS"},
    {name: "Answer Key", value: "ANSWER_KEY"},
    {name: "Admission", value: "ADMISSION"},
  ],
  isUpdateAvailable: [
    {name: "Update Available", value: true},
    {name: "No Update Available", value: false},
  ],
}


const FilterContainer = () => {
  const classes = useStyles()
  const posts = store.getState().posts
  const [filters, setFilters] = useState(posts.filters)

  const getSelectedFilters = useCallback(() => {
    return Object.keys(filters).reduce((selectedFilters, keyName) => {
        selectedFilters[keyName] = filters[keyName].filter(option => option.checked).map(opt => opt.value)
        return selectedFilters
      }, {}
    )
  }, [filters])

  const remove = (filters, key, value) => {
    const list = filters[key]
    const index = list.indexOf(value)
    filters[key] = list.slice(0, index).concat(list.slice(index + 1))
    if (filters[key].length === 0) delete filters[key]
  }

  const handleChange = (key, value) => {
    if (!filters[key]) filters[key] = []
    if (filters[key].includes(value)) remove(filters, key, value)
    else filters[key].push(value)
    setFilters({...filters})
  }

  useEffect(() => {
    store.dispatch(getPosts({filters, currentPage: 1}))
    store.dispatch(postsCount({filters, currentPage: 1}))
  }, [filters])

  return <div className={classes.root}>
    <div className={classes.titleBar}>
      <Typography variant="h5" className={classes.title}>Filters</Typography>
      <Chip label="&#x2715; &nbsp; Clear All" onClick={() => setFilters({})}/>
    </div>
    <SelectedOptions filters={filters} classes={classes} onclick={handleChange}/>
    <Divider className={classes.divider}/>
    {
      Object.keys(filterOptions).map(key =>
        <FilterOptions key={key} options={filterOptions[key]} filters={filters[key]}
                       onChange={(value) => handleChange(key, value)}
                       title={key}/>
      )
    }
  </div>
}

export default FilterContainer
