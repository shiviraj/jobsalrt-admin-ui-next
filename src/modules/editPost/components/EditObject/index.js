import React, {useState} from 'react';
import {Divider, Grid} from "@material-ui/core";
import {cloneObject} from "../../../../utils/utils";
import SaveAndSubmitButtons from "../SaveAndSubmitButtons";
import useStyles from "./useStyles";
import EditableObjectDetails from "./EditableObjectDetails";
import ObjectDetails from "./ObjectDetails";


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
        <EditableObjectDetails obj={obj} setObj={setObj} checkUpdate={checkUpdate}/>
      </Grid>

      {checkUpdate && updates && <Grid item xs={6} className={classes.right}>
        <ObjectDetails updatedObj={updates[keyName] || {header: [], body: []}} currentObj={obj}/>
      </Grid>}

      <Grid item xs={12}>
        <Divider/>
        <SaveAndSubmitButtons loading={isUpdating} handleSave={handleSavePost} handleSubmit={handleUpdatePost}/>
      </Grid>
    </Grid>
  )
};

export default EditObject;
