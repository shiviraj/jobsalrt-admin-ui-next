import React, {useState} from "react";
import {Button, Divider, Grid, Tab, Tabs} from "@material-ui/core";
import {cloneObject} from "../../../../utils/utils";
import API from "../../../../API";
import {useToast} from "../../../../common/components/ToastWrapper";
import SaveAndSubmitButtons from "../SaveAndSubmitButtons";
import useStyles from "./useStyles";
import OtherDetails from "./OtherDetails";
import EditableOtherDetails from "./EditableOtherDetails";

const EditOtherDetails = ({post, savePost, url, checkUpdate, updates}) => {
  const classes = useStyles()
  const toast = useToast()
  const [others, setOthers] = useState(cloneObject(post.others) || {})
  const [activeTab, setActiveTab] = useState(0)
  const [isUpdating, setIsUpdating] = useState(false)

  const updateOthers = () => setOthers({...others})

  const addNewObject = () => {
    others["New Object"] = {header: [], body: []}
    updateOthers()
  }

  const handleSavePost = () => {
    savePost({...post, others})
  }

  const handleUpdatePost = () => {
    handleSavePost()
    setIsUpdating(true)
    API.post.updatePost(post, url)
      .then(() => toast.success("Successfully updated post!!"))
      .catch(() => toast.error("Failed to update post!!"))
      .then(() => setIsUpdating(false))

  }

  const handleTabChange = (e, value) => setActiveTab(value);

  return <div>
    <div className={classes.header}>
      <Tabs value={activeTab} indicatorColor="primary" textColor="primary" onChange={handleTabChange}>
        {Object.keys(others).map((key, index) => <Tab key={key} label={key}/>)}
      </Tabs>
      <Button color="primary" variant="contained" className={classes.addButton} onClick={addNewObject}>
        Add New Object
      </Button>
    </div>
    <Divider className={classes.divider}/>

    <Grid container>
      <Grid item xs={checkUpdate ? 6 : 12}>
        {<EditableOtherDetails others={others} activeTab={activeTab} setOthers={setOthers} updateOthers={updateOthers}
                               setActiveTab={setActiveTab} checkUpdate={checkUpdate}/>}
      </Grid>

      {checkUpdate && updates && <Grid item xs={6} className={classes.right}>
        <OtherDetails others={others || {}} activeTab={activeTab} updated={updates.others}/>
      </Grid>}

      <Grid item xs={12}>
        <Divider/>
        <SaveAndSubmitButtons loading={isUpdating} handleSave={handleSavePost} handleSubmit={handleUpdatePost}
                              fullWidth/>
      </Grid>
    </Grid>
  </div>
}

export default EditOtherDetails
