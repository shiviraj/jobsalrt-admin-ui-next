import React, {useState} from 'react';
import {Divider, Grid} from "@material-ui/core";
import {cloneObject} from "../../../../utils/utils";
import API from "../../../../API";
import {useToast} from "../../../../common/components/ToastWrapper";
import SaveAndSubmitButtons from "../SaveAndSubmitButtons";
import EditableArrayDetails from "./EditableArrayDetails";
import ArrayDetails from "./ArrayDetails";
import useStyles from "./useStyles";

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
      <EditableArrayDetails list={list} setList={setList} checkUpdate={checkUpdate}/>
    </Grid>

    {checkUpdate && updates && <Grid item xs={6} className={classes.right}>
      <ArrayDetails updatedList={updates[keyName] || []} currentList={list}/>
    </Grid>}

    {!disabled && <Grid item xs={12}>
      <Divider/>
      <SaveAndSubmitButtons loading={isUpdating} handleSave={handleSavePost} handleSubmit={handleUpdatePost}/>
    </Grid>}
  </Grid>)
};

export default EditArray;
