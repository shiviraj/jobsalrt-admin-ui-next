import React, {useEffect, useState} from 'react'
import {makeStyles} from "@material-ui/core/styles";
import {Divider, ListItem, ListItemText, Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: '18%',
    backgroundColor: theme.palette.common.white,
    paddingTop: theme.spacing(2),
    "& > *": {paddingLeft: theme.spacing(2)}
  },
  active: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&:hover": {backgroundColor: theme.palette.primary.light,}
  },
  divider: {marginTop: theme.spacing(1), marginBottom: theme.spacing(1)},
}))

const options = {
  basicDetails: "Basic Details",
  dates: "Important Dates",
  importantLinks: "Important Links",
  feeDetails: "Fee Details",
  vacancyDetails: "Vacancy Details",
  ageLimit: "Age Limit",
  selectionProcess: "Selection Process",
  howToApply: "How To Apply",
  others: "Others",
  postDetails: "Post Details"
}

const PostOptions = ({setActive}) => {
  const classes = useStyles()
  const [activeTab, setActiveTab] = useState(0)


  useEffect(() => {
    const key = Object.keys(options)[activeTab];
    setActive({key, name: options[key]})
  }, [activeTab, setActive])

  return <div className={classes.root}>
    <Typography variant="h5">Post Sections</Typography>
    <Divider className={classes.divider}/>
    {
      Object.keys(options).map((key, index) => {
        return <ListItem button key={key} className={index === activeTab ? classes.active : ""}
                         onClick={() => setActiveTab(index)}>
          < ListItemText primary={options[key]}/>
        </ListItem>
      })
    }
  </div>
}


export default PostOptions
