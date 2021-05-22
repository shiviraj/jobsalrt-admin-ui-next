import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Button, Divider, FilledInput, Grid, IconButton, TextField, Typography} from "@material-ui/core";
import {Add, ArrowDownward, ArrowUpward, Close} from "@material-ui/icons";
import SaveAndSubmitButtons from "./SaveAndSubmitButtons";
import {cloneObject} from "../../../utils/utils";

const useStyles = makeStyles(theme => ({
  root: {margin: theme.spacing(1)},
  right: {borderLeft: `1px solid ${theme.palette.grey[300]}`},
  innerGrid: {padding: theme.spacing(2)},
  row: {
    display: "flex",
    width: "100%",
    justifyContent: "space-evenly",
  },
  cell: {
    border: `1px solid ${theme.palette.grey[500]}`,
    backgroundColor: theme.palette.common.white,
    width: "100%"
  },
  actionCell: {
    display: "flex",
    width: theme.spacing(30),
    justifyContent: "space-around",
    alignItems: "center",
    border: `1px solid ${theme.palette.grey[500]}`,
  },
  button: {
    margin: theme.spacing(.1),
    padding: theme.spacing(.5)
  },
  addRowButton: {
    display: "flex",
    justifyContent: "flex-end",
    margin: theme.spacing(1)
  },
}))


const ObjectDetails = ({obj, setObj, disabled, title}) => {
  const classes = useStyles()
  const [colNo, setColNo] = useState(2);

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
      <Typography variant="h6" align="center" color="primary">{title}</Typography>
      <div className={classes.row}>
        {obj.header.length !== 0
          ? obj.header.map((value, index) => {
            return <FilledInput className={classes.cell} value={value} key={`key-${index}`} multiline fullWidth
                                disabled={disabled}
                                onChange={(event) => updateHeader(index, event.target.value)}/>
          })
          : <Typography className={classes.cell} align="center" variant="h5">Header</Typography>
        }
        <div className={`${classes.actionCell} ${classes.cell}`}>
          <IconButton className={classes.button} onClick={removeHeader} disabled={disabled}><Close
            fontSize="large"/></IconButton>
          <IconButton className={classes.button} onClick={addHeader} disabled={disabled}><Add
            fontSize="large"/></IconButton>
        </div>
      </div>

      {
        obj.body.map((row, rowIndex) => (
          <div className={classes.row} key={rowIndex}>
            {row.map((value, colIndex) => {
              return <FilledInput className={classes.cell} value={value}
                                  key={`cell-${rowIndex}-${colIndex}`} multiline fullWidth disabled={disabled}
                                  onChange={(event) => updateBody(rowIndex, colIndex, event.target.value)}/>
            })}
            <div className={`${classes.actionCell} ${classes.cell}`}>
              <IconButton className={classes.button} onClick={() => removeRow(rowIndex)}
                          disabled={disabled}><Close/></IconButton>
              <IconButton className={classes.button} disabled={disabled}
                          onClick={() => moveDown(rowIndex)}><ArrowDownward/></IconButton>
              <IconButton className={classes.button} onClick={() => moveUp(rowIndex)} disabled={disabled}><ArrowUpward/></IconButton>
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


const EditObject = ({keyName, post, savePost, updatePost, isUpdating, checkUpdate, updates}) => {
  const classes = useStyles()
  const [obj, setObj] = useState(cloneObject(post[keyName]) || {header: [], body: []});

  const handleSavePost = () => {
    savePost({[keyName]: obj})
  }

  const handleUpdatePost = () => {
    handleSavePost()
    updatePost()
  }

  return (<Grid container>
      <Grid item xs={checkUpdate ? 6 : 12}>
        <ObjectDetails obj={obj} setObj={setObj} title="Current Post"/>
      </Grid>

      {checkUpdate && updates && <Grid item xs={6} className={classes.right}>
        <ObjectDetails obj={updates[keyName] || {header: [], body: []}} disabled title="New Update"/>
      </Grid>}

      <Grid item xs={12}>
        <Divider/>
        <SaveAndSubmitButtons loading={isUpdating} handleSave={handleSavePost} handleSubmit={handleUpdatePost}/>
      </Grid>
    </Grid>
  )
};

export default EditObject;
