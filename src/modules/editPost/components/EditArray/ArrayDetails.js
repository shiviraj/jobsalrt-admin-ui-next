import {FilledInput, Paper, Typography} from "@material-ui/core";
import React from "react";
import useStyles from "./useStyles";
import IconButton from "@material-ui/core/IconButton";
import {ArrowDownward, ArrowUpward, Close} from "@material-ui/icons";
import {indexesOfDifferentItems, isEqualLength} from "./utils";

const ArrayDetails = ({updatedList, currentList, disabledTitle}) => {
  const classes = useStyles()

  const diffIndexes = indexesOfDifferentItems(currentList, updatedList)

  return <div className={classes.innerGrid}>
    {!disabledTitle &&
    <Typography variant="h6" align="center" color={isEqualLength(currentList, updatedList) ? "primary" : "error"}>
      New Update
    </Typography>}
    <Paper>
      {
        updatedList.map((value, index) => {
          return <div className={classes.row} key={`key-${index}`}>
            <FilledInput className={classes.cell} value={value} multiline fullWidth disabled
                         error={diffIndexes.includes(index)}/>
            <div className={`${classes.actionCell} ${classes.cell}`}>
              <IconButton className={classes.button} disabled><Close/></IconButton>
              <IconButton className={classes.button} disabled><ArrowDownward/></IconButton>
              <IconButton className={classes.button} disabled><ArrowUpward/></IconButton>
            </div>
          </div>
        })
      }
    </Paper>
  </div>
}

export default ArrayDetails
