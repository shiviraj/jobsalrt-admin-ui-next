import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Button, Divider, FilledInput, Grid, Paper, Typography} from "@material-ui/core";
import {cloneObject} from "../../../utils/utils";
import API from "../../../API";
import {useToast} from "../../../common/components/ToastWrapper";
import IconButton from "@material-ui/core/IconButton";
import {ArrowDownward, ArrowUpward, Close} from "@material-ui/icons";
import SaveAndSubmitButtons from "./SaveAndSubmitButtons";

const useStyles = makeStyles(theme => ({
  root: {margin: theme.spacing(1)},
  innerGrid: {padding: theme.spacing(2)},
  right: {borderLeft: `1px solid ${theme.palette.grey[300]}`},
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
    width: theme.spacing(25),
    justifyContent: "space-around",
    alignItems: "center",
    border: `1px solid ${theme.palette.grey[500]}`,
  },
  button: {
    paddingRight: theme.spacing(1),
    margin: theme.spacing(.1),
    paddingLeft: theme.spacing(1),
  },
  addRowButton: {
    display: "flex",
    justifyContent: "flex-end",
    margin: theme.spacing(1)
  }
}))

const ArrayDetails = ({list, setList, disabled, title, checkUpdate}) => {
  const classes = useStyles()

  const updateList = () => setList([...list]);

  const removeRow = (rowNo) => {
    setList(list.filter((_, index) => index !== rowNo))
  };

  const moveUp = (rowNo) => {
    if (rowNo === 0) return
    const temp = list[rowNo]
    list[rowNo] = list[rowNo - 1]
    list[rowNo - 1] = temp
    updateList();
  };

  const moveDown = (rowNo) => {
    if (rowNo === list.length - 1) return
    const temp = list[rowNo]
    list[rowNo] = list[rowNo + 1]
    list[rowNo + 1] = temp
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

  console.log(list)

  return <div className={classes.innerGrid}>
    {checkUpdate && <Typography variant="h6" align="center" color="primary">{title}</Typography>}
    <Paper>
      {
        list.map((value, index) => {
          return <div className={classes.row} key={`key-${index}`}>
            <FilledInput className={classes.cell} value={value} multiline fullWidth disabled={disabled}
                         onChange={(event) => updateListItem(index, event.target.value)}/>
            <div className={`${classes.actionCell} ${classes.cell}`}>
              <IconButton className={classes.button} onClick={() => removeRow(index)}
                          disabled={disabled}><Close/></IconButton>
              <IconButton className={classes.button} onClick={() => moveDown(index)}
                          disabled={disabled}><ArrowDownward/></IconButton>
              <IconButton className={classes.button} onClick={() => moveUp(index)}
                          disabled={disabled}><ArrowUpward/></IconButton>
            </div>
          </div>
        })
      }
    </Paper>
    {!disabled && <div className={classes.addRowButton}>
      <Button size="small" color="primary" variant="contained" onClick={handleAddRow}>Add Row</Button>
    </div>}

  </div>
}

const EditArray = ({keyName, post, savePost, url, checkUpdate, updates, disabled}) => {
  const classes = useStyles()
  const toast = useToast()
  const [list, setList] = useState(cloneObject(post[keyName]) || []);
  const [isUpdating, setIsUpdating] = useState(false)

  const handleSavePost = () => {
    post[keyName] = list
    savePost(post)
  }

  const handleUpdatePost = () => {
    handleSavePost()
    setIsUpdating(true)
    API.post.updatePost(post, url)
      .then(() => toast.success("Successfully updated post!!"))
      .catch(() => toast.error("Failed to update post!!"))
      .then(() => setIsUpdating(false))
  }

  return (<Grid container>
    <Grid item xs={checkUpdate ? 6 : 12}>
      <ArrayDetails list={list} setList={setList} title="Current Post" checkUpdate={checkUpdate} disabled={disabled}/>
    </Grid>

    {checkUpdate && updates && <Grid item xs={6} className={classes.right}>
      <ArrayDetails list={updates[keyName] || []} title="New Update" disabled checkUpdate/>
    </Grid>}

    {!disabled && <Grid item xs={12}>
      <Divider/>
      <SaveAndSubmitButtons loading={isUpdating} handleSave={handleSavePost} handleSubmit={handleUpdatePost}/>
    </Grid>}
  </Grid>)
};

export default EditArray;
