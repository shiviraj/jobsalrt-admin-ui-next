import React, {useEffect, useState} from "react";
import {Divider, Grid} from "@material-ui/core";
import API from "../../../../API";
import {cloneObject} from "../../../../utils/utils";
import {useToast} from "../../../../common/components/ToastWrapper";
import SaveAndSubmitButtons from "../SaveAndSubmitButtons";
import EditableBasicDetails from "./EditableBasicDetails";
import BasicDetails from "./BasicDetails";
import useStyles from "./useStyles";

const EditBasicDetails = ({post, savePost, url, checkUpdate, updates}) => {
  const classes = useStyles()
  const toast = useToast()
  const [details, setDetails] = useState(cloneObject(post.basicDetails))
  const [isSubmit, setIsSubmit] = useState(false)
  const [urlAvailable, setUrlAvailble] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
      API.post.urlAvailable(details.url)
        .then(({data: res}) => {
          if (res.first || res.second === post.source)
            setUrlAvailble(true)
          else setUrlAvailble(false)
        })
        .catch(() => ({}))
    }, [details.url, post]
  )

  const updateDetails = (key, value) => {
    details[key] = value
    setDetails({...details})
  }

  const handleFormTypeChange = (_e, value) => updateDetails("formType", value)

  const handleSave = (event) => {
    event.preventDefault()
    savePost({basicDetails: details})
    if (isSubmit && urlAvailable) {
      setIsUpdating(true)
      API.post.updatePost(post, url)
        .then(() => toast.success("Successfully updated post!!"))
        .catch(() => toast.error("Failed to update post!!"))
        .then(() => setIsUpdating(false))
    }
  };

  return <Grid container component="form" onSubmit={handleSave} className={classes.container}>
    <Grid item xs={checkUpdate ? 6 : 12}>
      <EditableBasicDetails handleFormTypeChange={handleFormTypeChange} details={details}
                            updateDetails={updateDetails} urlAvailable={urlAvailable} checkUpdate={checkUpdate}/>
    </Grid>
    {checkUpdate && updates && <Grid item xs={6} className={classes.right}>
      <BasicDetails updatedDetails={updates.basicDetails} currentDetails={details} checkUpdate/>
    </Grid>}
    <Grid item xs={12}>
      <Divider/>
      <SaveAndSubmitButtons type="submit" handleSave={() => setIsSubmit(false)} handleSubmit={() => setIsSubmit(true)}
                            loading={isUpdating} fullWidth/>
    </Grid>
  </Grid>
}

export default EditBasicDetails
