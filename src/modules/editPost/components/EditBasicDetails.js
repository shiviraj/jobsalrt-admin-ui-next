import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@material-ui/core";
import SaveAndSubmitButtons from "./SaveAndSubmitButtons";
import FormInput from "../../../common/components/FormInput";
import API from "../../../API";
import {cloneObject} from "../../../utils/utils";
import {useToast} from "../../../common/components/ToastWrapper";
import {useRouter} from "next/router";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    "& > *": {
      width: "48%"
    }
  },
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

const EditBasicDetails = ({post, savePost, url}) => {
  const classes = useStyles()
  const toast = useToast()
  const router = useRouter()
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

  return <form onSubmit={handleSave}>
    <div className={classes.root}>
      <FormControl component="fieldset" required>
        <FormLabel component="legend">Form Type</FormLabel>
        <RadioGroup row value={details.formType} onChange={handleFormTypeChange}>
          <FormControlLabel value="ONLINE" control={<Radio color="primary"/>} label="Online"/>
          <FormControlLabel value="OFFLINE" control={<Radio color="primary"/>} label="Offline"/>
        </RadioGroup>
      </FormControl>
      {
        keyTitle.map(obj => {
          return <FormInput {...obj} key={obj.label} value={details[obj.key]}
                            onChange={(value) => updateDetails(obj.key, value)}/>
        })
      }
      <FormInput label="Url" value={details.url.split(" ").join("-").toLowerCase()}
                 onChange={(value) => updateDetails("url", value.split(" ").join("-").toLowerCase())} required
                 error={!urlAvailable}/>
    </div>
    <SaveAndSubmitButtons type="submit" handleSave={() => setIsSubmit(false)} handleSubmit={() => setIsSubmit(true)}
                          loading={isUpdating} fullWidth/>

  </form>
}

export default EditBasicDetails
