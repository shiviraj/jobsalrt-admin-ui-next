import {Button, FilledInput, Paper, Typography} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {Add, Close} from "@material-ui/icons";
import React from "react";
import useStyles from "./useStyles";

const EditableArrayDetails = ({list, setList, checkUpdate}) => {
  const classes = useStyles()

  const updateList = () => setList([...list]);

  const removeRow = (rowNo) => {
    setList(list.filter((_, index) => index !== rowNo))
  };

  const addRow = (index) => {
    list = list.slice(0, index).concat([""], list.slice(index))
    updateList();
  };

  const updateListItem = (index, value) => {
    list[index] = value
    updateList();
  }

  const handleAddRow = (e) => {
    list.push("")
    updateList();
  };

  return <div className={classes.innerGrid}>
    {checkUpdate && <Typography variant="h6" align="center" color="primary">Current Post</Typography>}
    <Paper>
      {
        list.map((value, index) => {
          return <div className={classes.row} key={`key-${index}`}>
            <FilledInput className={classes.cell} value={value} multiline fullWidth
                         onChange={(event) => updateListItem(index, event.target.value)}/>
            <div className={`${classes.actionCell} ${classes.cell}`}>
              <IconButton className={classes.button} onClick={() => removeRow(index)}><Close/></IconButton>
              <IconButton className={classes.button} onClick={() => addRow(index)}><Add/></IconButton>
            </div>
          </div>
        })
      }
    </Paper>
    <div className={classes.addRowButton}>
      <Button size="small" color="primary" variant="contained" onClick={handleAddRow}>Add Row</Button>
    </div>
  </div>
}

export default EditableArrayDetails
