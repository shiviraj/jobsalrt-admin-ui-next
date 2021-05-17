import React, {useCallback, useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Chip, Divider, Typography} from "@material-ui/core";
import FilterOptions from "./FilterOptions";
import {Close} from "@material-ui/icons";

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
    filters[keyName].map(({name, value, checked}, index) =>
      checked && <Button variant="contained"
                         key={`${keyName}_${index}`}
                         onClick={() => onclick(keyName, value)}
                         className={classes.filter}><Close fontSize="small"/> &nbsp; {name} </Button>
    )
  )
};


const FilterContainer = ({applyFilter}) => {
  const classes = useStyles()
  const [filters, setFilters] = useState({
    status: [
      {name: "Verified", value: "VERIFIED", checked: false},
      {name: "Not Verified", value: "NOT_VERIFIED", checked: false},
      {name: "Disabled", value: "DISABLED", checked: false}
    ],
    formType: [
      {name: "Online", value: "ONLINE", checked: false},
      {name: "Offline", value: "OFFLINE", checked: false}
    ],
    type: [
      {name: "Latest Job", value: "LATEST_JOB", checked: false},
      {name: "Admit Card", value: "ADMIT_CARD", checked: false},
      {name: "Result", value: "RESULT", checked: false},
      {name: "Syllabus", value: "SYLLABUS", checked: false},
      {name: "Answer Key", value: "ANSWER_KEY", checked: false},
      {name: "Admission", value: "ADMISSION", checked: false},
    ],
    isUpdateAvailable: [
      {name: "Update Available", value: true, checked: false},
      {name: "No Update Available", value: false, checked: false},
    ],
  })

  const getSelectedFilters = useCallback(() => {
    return Object.keys(filters).reduce((selectedFilters, keyName) => {
        selectedFilters[keyName] = filters[keyName].filter(option => option.checked).map(opt => opt.value)
        return selectedFilters
      }, {}
    )
  }, [filters])


  const handleChange = (key, value) => {
    const clickedOption = filters[key].find(obj => obj.value === value);
    clickedOption.checked = !clickedOption.checked
    setFilters({...filters})
  }

  const handleClearAll = () => {
    Object.keys(filters).forEach(keyName => filters[keyName].forEach(opt => opt.checked = false))
    setFilters({...filters})
  }

  useEffect(() => {
    applyFilter(getSelectedFilters())
  }, [applyFilter, getSelectedFilters])

  return <div className={classes.root}>
    <div className={classes.titleBar}>
      <Typography variant="h5" className={classes.title}>Filters</Typography>
      <Chip label="&#x2715; &nbsp; Clear All" onClick={handleClearAll}/>
    </div>
    <SelectedOptions filters={filters} classes={classes} onclick={handleChange}/>
    <Divider className={classes.divider}/>
    {
      Object.keys(filters).map(key =>
        <FilterOptions key={key} options={filters[key]} handleChange={handleChange} keyName={key} title={key}/>
      )
    }
  </div>
}

export default FilterContainer
