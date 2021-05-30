import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Chip, Divider, Typography} from "@material-ui/core";
import FilterOptions from "./FilterOptions";
import {Close} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  root: {
    width: '18%',
    backgroundColor: theme.palette.common.white,
    paddingTop: theme.spacing(1),
  },
  titleBar: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(0, 2)
  },
  chip: {width: theme.spacing(11)},
  title: {marginBottom: theme.spacing(1)},
  filter: {backgroundColor: theme.palette.grey[300], margin: theme.spacing(0.5), padding: theme.spacing(0.25, 0.5)},
  divider: {marginTop: theme.spacing(1)}
}));


const SelectedOptions = ({filters = {}, classes, onclick}) => {
  return Object.keys(filters).map((keyName) =>
    filters[keyName].map((value, index) => {
        const options = filterOptions[keyName].find(opt => opt.value === value);
        return <Button variant="contained"
                       size="small"
                       key={`${keyName}_${index}`}
                       onClick={() => onclick(keyName, value)}
                       className={classes.filter}>
          <Close fontSize="small"/> {options.name}
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
  updateAvailable: [
    {name: "Update Available", value: true},
    {name: "No Update Available", value: false},
  ],
}


const FilterContainer = ({filters, getPosts, postsCount}) => {
  const classes = useStyles()

  const handleClearAll = () => {
    postsCount({currentPage: 1, filters: {}})
    getPosts({currentPage: 1, filters: {}})
  };

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

    postsCount({currentPage: 1, filters})
    getPosts({currentPage: 1, filters})
  }

  return <div className={classes.root}>
    <div className={classes.titleBar}>
      <Typography variant="h6" className={classes.title}>Filters</Typography>
      <Chip label="&#x2715; &nbsp; Clear All" size="small" onClick={handleClearAll} className={classes.chip}/>
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
