import React, {useEffect} from "react";
import {FilledInput, IconButton, Typography} from "@material-ui/core";
import {Add, ArrowDownward, ArrowUpward, Close} from "@material-ui/icons";
import useStyles from "./useStyles";
import {findDiffIndex, isSameObject} from "./utils";

const ObjectDetails = ({updatedObj, currentObj}) => {
  const classes = useStyles()

  const isSame = isSameObject(currentObj, updatedObj)
  const diffIndex = findDiffIndex(currentObj, updatedObj)

  useEffect(() => {
    updatedObj.body = updatedObj.body.filter(row => row.length)
    currentObj.body = currentObj.body.filter(row => row.length)
  }, [])

  return <React.Fragment>
    <div className={classes.innerGrid}>
      <Typography variant="h6" align="center" color={isSame ? "primary" : "error"}>New Update</Typography>
      <div className={classes.row}>
        {updatedObj.header.length !== 0
          ? updatedObj.header.map((value, index) => {
            return <FilledInput className={classes.cell} value={value} key={`key-${index}`} multiline fullWidth
                                error={diffIndex.header.includes(index)} disabled/>
          })
          : <Typography className={classes.cell} align="center" variant="h5">Header</Typography>
        }
        <div className={`${classes.actionCell} ${classes.cell}`}>
          <IconButton className={classes.button} disabled><Close fontSize="large"/></IconButton>
          <IconButton className={classes.button} disabled><Add fontSize="large"/></IconButton>
        </div>
      </div>

      {
        updatedObj.body.map((row, rowIndex) => (
          <div className={classes.row} key={rowIndex}>
            {row.map((value, colIndex) => {
              return <FilledInput className={classes.cell} value={value} variant="outlined"
                                  error={diffIndex.body[rowIndex].includes(colIndex)}
                                  key={`cell-${rowIndex}-${colIndex}`} multiline fullWidth disabled/>
            })}
            <div className={`${classes.actionCell} ${classes.cell}`}>
              <IconButton className={classes.button} disabled><Close/></IconButton>
              <IconButton className={classes.button} disabled><ArrowDownward/></IconButton>
              <IconButton className={classes.button} disabled><ArrowUpward/></IconButton>
            </div>
          </div>
        ))
      }
    </div>
  </React.Fragment>
}
export default ObjectDetails
