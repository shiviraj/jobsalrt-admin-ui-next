import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  Tab,
  Tabs
} from "@material-ui/core";
import EditArray from "./EditArray";
import SaveAndSubmitButtons from "./SaveAndSubmitButtons";
import FormInput from "../../../common/components/FormInput";
import {cloneObject} from "../../../utils/utils";
import API from "../../../API";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    "& > *": {
      width: "48%"
    }
  },
  divider: {marginTop: theme.spacing(1), marginBottom: theme.spacing(1)},
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    margin: theme.spacing(2)
  },
  submitButton: {
    margin: theme.spacing(2)
  },
  stateContainer: {
    display: "flex",
    flexDirection: "column",
    marginRight: theme.spacing(2)
  },
  createdAt: {
    margin: theme.spacing(-2, 0, 0, 6),
    fontSize: theme.spacing(1.5),
    textAlign: "right"
  }
}))

const states = [
  {name: "Latest Job", value: "LATEST_JOB"},
  {name: "Admit Card", value: "ADMIT_CARD"},
  {name: "Result", value: "RESULT"},
  {name: "Syllabus", value: "SYLLABUS"},
  {name: "Answer Key", value: "ANSWER_KEY"},
  {name: "Admission", value: "ADMISSION"},
]

const EditPostDetails = ({post, savePost}) => {
  const classes = useStyles()
  const [localPost, updateLocalPost] = useState(cloneObject(post))
  // TODO need to verify failures flow
  const [failures, setFailures] = useState({failures: post.failures} || {})
  const [activeTab, setActiveTab] = useState(0)
  const [isSubmit, setIsSubmit] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const updatePost = () => {
    return updateLocalPost({...localPost});
  }

  const updateDetails = (key, value) => {
    localPost[key] = value
    updatePost()
  }

  const handleStateChange = (state, isSelect) => {
    if (isSelect) localPost.states.push({type: state})
    else localPost.states = localPost.states.filter(({type}) => type !== state)
    updatePost()
  }

  const handleStatusChange = (_e, status) => {
    localPost.status = status
    updatePost()
  }

  const handleUpdateAvailbleChange = (_e, updateAvailable) => {
    localPost.isUpdateAvailable = JSON.parse(updateAvailable)
    updatePost()
  }

  const handleSave = (event) => {
    event.preventDefault()
    savePost(localPost)
    if (isSubmit) {
      setIsUpdating(true)
      API.post.updatePost(post)
        .then(() => ({}))
        .catch(() => ({}))
        .then(() => setIsUpdating(false))
    }

  };

  const handleUpdateFailures = () => {
    localPost.failures = failures
    updatePost()
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

    {activeTab === 0 && <div className={classes.root}>
      <FormInput label="Source" value={localPost.source} disabled/>
      <FormInput label="Total Views" value={localPost.totalViews ? localPost.totalViews : "0"} disabled/>
      <FormInput label="Created At" value={localPost.createdAt} disabled/>
      <FormInput label="Last Update on" value={localPost.postUpdateDate} disabled/>
      <FormInput label="Other Source" value={localPost.otherSource}
                 onChange={(value) => updateDetails("otherSource", value)}/>

      <FormControl component="fieldset" required>
        <FormLabel component="legend">Status</FormLabel>
        <RadioGroup row value={localPost.status} onChange={handleStatusChange}>
          <FormControlLabel value="NOT_VERIFIED" control={<Radio color="primary"/>} label="Not Verified"/>
          <FormControlLabel value="VERIFIED" control={<Radio color="primary"/>} label="Verified"/>
          <FormControlLabel value="DISABLED" control={<Radio color="primary"/>} label="Disabled"/>
        </RadioGroup>
      </FormControl>

      <FormControl component="fieldset" required>
        <FormLabel component="legend">Update Available</FormLabel>
        <RadioGroup row value={localPost.isUpdateAvailable.toString()} onChange={handleUpdateAvailbleChange}>
          <FormControlLabel value="true" control={<Radio color="primary"/>} label="True"/>
          <FormControlLabel value="false" control={<Radio color="primary"/>} label="False"/>
        </RadioGroup>
      </FormControl>

      <FormControl component="fieldset" required>
        <FormLabel component="legend">State</FormLabel>
        <FormGroup row>
          {
            states.map(state => {
              const {createdAt} = post.states.find(st => st.type === state.value) || {}
              return <div className={classes.stateContainer}><FormControlLabel
                key={state.value}
                control={
                  <Checkbox name="checkedA"
                            checked={!!localPost.states.find(({type}) => type === state.value)}
                            onChange={(e, p) => handleStateChange(state.value, p)}
                            color="primary"/>}
                label={state.name}/>
                {createdAt && <div className={classes.createdAt}>({createdAt})</div>}
              </div>
            })
          }
        </FormGroup>
      </FormControl>
    </div>}

    {
      activeTab === 1 &&
      <EditArray post={failures} keyName="failures" setPost={setFailures}
                 triggerSubmit={handleUpdateFailures}/>
    }

    <SaveAndSubmitButtons type="submit" fullWidth loading={isUpdating}
                          handleSave={() => setIsSubmit(false)}
                          handleSubmit={() => setIsSubmit(true)}
    />

  </form>
}

export default EditPostDetails
