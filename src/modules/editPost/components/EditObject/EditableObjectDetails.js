import useStyles from "./useStyles";
import React, {useEffect, useState} from "react";
import {Button, FilledInput, IconButton, TextField, Typography} from "@material-ui/core";
import {Add, ArrowDownward, ArrowUpward, Close} from "@material-ui/icons";

const EditableObjectDetails = ({obj, setObj, checkUpdate}) => {
  const classes = useStyles()
  const [colNo, setColNo] = useState(2);

  useEffect(() => {
    const body = obj.body.filter(row => row.length)
    setObj({...obj, body})
  }, [])

  const updateObj = () => setObj({...obj});

  const removeRow = (rowNo) => {
    obj.body = obj.body.filter((_, index) => index !== rowNo)
    updateObj();
  };

  const moveUp = (rowNo) => {
    if (rowNo === 0) return
    const temp = obj.body[rowNo]
    obj.body[rowNo] = obj.body[rowNo - 1]
    obj.body[rowNo - 1] = temp
    updateObj();
  };

  const moveDown = (rowNo) => {
    if (rowNo === obj.body.length - 1) return
    const temp = obj.body[rowNo]
    obj.body[rowNo] = obj.body[rowNo + 1]
    obj.body[rowNo + 1] = temp
    updateObj();
  };

  const removeHeader = () => {
    obj.header = []
    updateObj();
  }

  const addHeader = () => {
    const cols = obj.body.length ? obj.body[0].length : colNo
    obj.header = Array(cols).fill("");
    updateObj();
  }

  const updateHeader = (index, value) => {
    obj.header[index] = value
    updateObj();
  }

  const updateBody = (rowIndex, colIndex, value) => {
    obj.body[rowIndex][colIndex] = value
    updateObj();
  }

  const handleAddRow = (e) => {
    const colNumber = obj.body.length === 0 ? colNo : obj.body[0].length

    const newRow = Array(colNumber).fill("");
    obj.body.push(newRow)
    updateObj();
  };

  return <React.Fragment>
    <div className={classes.innerGrid}>
      {checkUpdate && <Typography variant="h6" align="center" color="primary">Current Post</Typography>}
      <div className={classes.row}>
        {obj.header.length !== 0
          ? obj.header.map((value, index) => {
            return <FilledInput className={classes.cell} value={value} key={`key-${index}`} multiline fullWidth
                                onChange={(event) => updateHeader(index, event.target.value)}/>
          })
          : <Typography className={classes.cell} align="center" variant="h5">Header</Typography>
        }
        <div className={`${classes.actionCell} ${classes.cell}`}>
          <IconButton className={classes.button} onClick={removeHeader}><Close fontSize="large"/></IconButton>
          <IconButton className={classes.button} onClick={addHeader}><Add fontSize="large"/></IconButton>
        </div>
      </div>

      {
        obj.body.map((row, rowIndex) => (
          <div className={classes.row} key={rowIndex}>
            {row.map((value, colIndex) => {
              return <FilledInput className={classes.cell} value={value}
                                  key={`cell-${rowIndex}-${colIndex}`} multiline fullWidth
                                  onChange={(event) => updateBody(rowIndex, colIndex, event.target.value)}/>
            })}
            <div className={`${classes.actionCell} ${classes.cell}`}>
              <IconButton className={classes.button} onClick={() => removeRow(rowIndex)}><Close/></IconButton>
              <IconButton className={classes.button}
                          onClick={() => moveDown(rowIndex)}><ArrowDownward/></IconButton>
              <IconButton className={classes.button} onClick={() => moveUp(rowIndex)}><ArrowUpward/></IconButton>
            </div>
          </div>
        ))
      }
    </div>

    <div className={classes.addRowButton}>
      {obj.body.length === 0 &&
      <TextField label="Total Columns" variant="outlined" size="small" type="number" value={colNo}
                 onChange={(event) => setColNo(+event.target.value)}/>}
      <Button size="small" color="primary" variant="contained" onClick={handleAddRow}>Add Row</Button>
    </div>
  </React.Fragment>
}
export default EditableObjectDetails
