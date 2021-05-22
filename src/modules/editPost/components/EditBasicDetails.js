import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography
} from "@material-ui/core";
import API from "../../../API";
import {cloneObject} from "../../../utils/utils";
import {useToast} from "../../../common/components/ToastWrapper";
import FormInput from "../../../common/components/FormInput";
import SaveAndSubmitButtons from "./SaveAndSubmitButtons";

const useStyles = makeStyles((theme) => ({
  container: {display: "flex"},
  right: {borderLeft: `1px solid ${theme.palette.grey[300]}`},
  innerGrid: {padding: theme.spacing(2)}
}))

const keyTitle = [{key: "name", label: "Post Title", required: true},
  {key: "advtNo", label: "Advt No"},
  {key: "lastDate", label: "Last Date", type: "date", InputLabelProps: {shrink: true}},
  {key: "totalVacancies", label: "Vacancies", type: "number"},
  {key: "location", label: "Location"},
  {key: "company", label: "Company"},
  {key: "qualification", label: "Qualification"},
  {key: "minAgeLimit", label: "Age Limit (Min)", type: "date", InputLabelProps: {shrink: true}},
  {key: "maxAgeLimit", label: "Age Limit (Max)", type: 'date', InputLabelProps: {shrink: true}},
  {key: "postLogo", label: "Post Logo Url", required: true},
]

const Details = ({details, handleFormTypeChange, updateDetails, urlAvailable, disabled, title}) => {
  const classes = useStyles()
  return <div className={classes.innerGrid}>
    <Typography variant="h6" align="center" color="primary">{title}</Typography>
    <FormControl component="fieldset" required disabled={disabled}>
      <FormLabel component="legend">Form Type</FormLabel>
      <RadioGroup row value={details.formType} onChange={handleFormTypeChange}>
        <FormControlLabel value="ONLINE" control={<Radio color="primary" disabled={disabled}/>} label="Online"/>
        <FormControlLabel value="OFFLINE" control={<Radio color="primary" disabled={disabled}/>} label="Offline"/>
      </RadioGroup>
    </FormControl>
    {
      keyTitle.map(obj => {
        return <FormInput {...obj} key={obj.label} value={details[obj.key]}
                          onChange={(value) => updateDetails(obj.key, value)} disabled={disabled}/>
      })
    }
    <FormInput label="Url" value={details.url.split(" ").join("-").toLowerCase()}
               onChange={(value) => updateDetails("url", value.split(" ").join("-").toLowerCase())} required
               error={!urlAvailable} disabled={disabled}/>
  </div>
}

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

  return <Grid container component="form" onSubmit={handleSave}>
    <Grid item xs={checkUpdate ? 6 : 12}>
      <Details disabled={false} handleFormTypeChange={handleFormTypeChange} details={details} title="Current Post"
               updateDetails={updateDetails} urlAvailable={urlAvailable}/>
    </Grid>
    {checkUpdate && updates && <Grid item xs={6} className={classes.right}>
      <Details disabled={true} details={updates.basicDetails} title="New Updates" urlAvailable={urlAvailable}/>
    </Grid>}
    <Grid item xs={12}>
      <Divider/>
      <SaveAndSubmitButtons type="submit" handleSave={() => setIsSubmit(false)} handleSubmit={() => setIsSubmit(true)}
                            loading={isUpdating} fullWidth/>
    </Grid>
  </Grid>
}

export default EditBasicDetails
