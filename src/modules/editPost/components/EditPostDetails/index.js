import React, {useState} from "react";
import {Divider, Grid, Tab, Tabs} from "@material-ui/core";
import {cloneObject} from "../../../../utils/utils";
import API from "../../../../API";
import {useToast} from "../../../../common/components/ToastWrapper";
import PostDetails from "./PostDetails";
import useStyles from "./useStyles";
import SaveAndSubmitButtons from "../SaveAndSubmitButtons";

const EditPostDetails = ({post, savePost, url, checkUpdate, updates}) => {
  const classes = useStyles()
  const toast = useToast()
  const [localPost, updateLocalPost] = useState(cloneObject(post))
  // TODO need to verify failures flow
  const [activeTab, setActiveTab] = useState(0)
  const [isSubmit, setIsSubmit] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)


  const handleSave = (event) => {
    event.preventDefault()
    savePost(localPost)
    if (isSubmit) {
      setIsUpdating(true)
      API.post.updatePost(post, url)
        .then(() => toast.success("Successfully updated post!!"))
        .catch(() => toast.error("Failed to update post!!"))
        .then(() => setIsUpdating(false))
    }
  };

  return <form onSubmit={handleSave}>
    <Tabs value={activeTab}
          indicatorColor="primary"
          textColor="primary"
          onChange={(e, value) => setActiveTab(value)}>
      <Tab label="Common Details"/>
      <Tab label="Failures"/>
    </Tabs>
    <Divider className={classes.divider}/>


    <Grid container>
      <Grid item xs={checkUpdate ? 6 : 12}>
        <PostDetails activeTab={activeTab} localPost={localPost} updateLocalPost={updateLocalPost} updates={updates}
                     checkUpdate={checkUpdate} title="Current Post" post={post}/>
      </Grid>

      {checkUpdate && updates && <Grid item xs={6} className={classes.right}>
        <PostDetails disabled title="New Update" localPost={updates} post={updates} activeTab={activeTab} checkUpdate
                     updates={updates}/>
      </Grid>}

      <Grid item xs={12}>
        <Divider/>
        <SaveAndSubmitButtons type="submit" fullWidth loading={isUpdating} handleSave={() => setIsSubmit(false)}
                              handleSubmit={() => setIsSubmit(true)}/>
      </Grid>
    </Grid>
  </form>
}

export default EditPostDetails
