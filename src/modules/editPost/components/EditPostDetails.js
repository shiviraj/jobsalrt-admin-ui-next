import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Tab,
  Tabs,
  Typography
} from "@material-ui/core";
import SaveAndSubmitButtons from "./SaveAndSubmitButtons";
import {cloneObject} from "../../../utils/utils";
import API from "../../../API";
import {useToast} from "../../../common/components/ToastWrapper";
import FormInput from "../../../common/components/FormInput";
import EditArray from "./EditArray";

const useStyles = makeStyles((theme) => ({
  innerGrid: {padding: theme.spacing(2)},
  right: {borderLeft: `1px solid ${theme.palette.grey[300]}`},
  halfWidth: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    "&>*": {
      width: "48%"
    }
  },
  fullWidth: {
    "&>*": {
      width: "98%"
    }
  },
  divider: {marginTop: theme.spacing(1)},
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
    margin: theme.spacing(-1.8, 0, 0, 6),
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

const PostDetails = ({activeTab, localPost, updateLocalPost, post, title, disabled, checkUpdate, updates}) => {
  const classes = useStyles()
  const [failures, setFailures] = useState({failures: post.failures} || {})

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

  const handleUpdateFailures = () => {
    localPost.failures = failures
    updatePost()
  };

  return <div className={classes.innerGrid}>
    {checkUpdate && <Typography variant="h6" align="center" color="primary">{title}</Typography>}
    {activeTab === 0 && <div className={`${classes.root} ${checkUpdate ? classes.fullWidth : classes.halfWidth}`}>
      <FormInput label="Source" value={localPost.source} disabled/>
      <FormInput label="Total Views" value={localPost.totalViews ? localPost.totalViews : "0"} disabled/>
      <FormInput label="Created At" value={localPost.createdAt} disabled/>
      <FormInput label="Last Update on" value={localPost.postUpdateDate} disabled/>
      <FormInput label="Other Source" value={localPost.otherSource} disabled={disabled}
                 onChange={(value) => updateDetails("otherSource", value)}/>

      <FormControl component="fieldset" required disabled={disabled}>
        <FormLabel component="legend">Status</FormLabel>
        <RadioGroup row value={localPost.status} onChange={handleStatusChange}>
          <FormControlLabel value="NOT_VERIFIED" control={<Radio color="primary"/>} label="Not Verified"/>
          <FormControlLabel value="VERIFIED" control={<Radio color="primary"/>} label="Verified"/>
          <FormControlLabel value="DISABLED" control={<Radio color="primary"/>} label="Disabled"/>
        </RadioGroup>
      </FormControl>

      <FormControl component="fieldset" required disabled={disabled}>
        <FormLabel component="legend">Update Available</FormLabel>
        <RadioGroup row value={localPost.isUpdateAvailable.toString()} onChange={handleUpdateAvailbleChange}>
          <FormControlLabel value="true" control={<Radio color="primary"/>} label="True"/>
          <FormControlLabel value="false" control={<Radio color="primary"/>} label="False"/>
        </RadioGroup>
      </FormControl>

      <FormControl component="fieldset" required disabled={disabled}>
        <FormLabel component="legend">State</FormLabel>
        <FormGroup row>
          {
            states.map(state => {
              const {createdAt} = post.states.find(st => st.type === state.value) || {}
              return <div key={state.value} className={classes.stateContainer}>
                <FormControlLabel
                  control={
                    <Checkbox name="checkedA"
                              checked={!!localPost.states.find(({type}) => type === state.value)}
                              onChange={(e, p) => handleStateChange(state.value, p)}
                              color="primary"/>}
                  label={state.name}/>
                {createdAt && <div className={classes.createdAt}>({createdAt.split("T")[0]})</div>}
              </div>
            })
          }
        </FormGroup>
      </FormControl>
    </div>}

    {
      activeTab === 1 &&
      <EditArray keyName="failures" post={post} savePost={handleUpdateFailures} updates={updates} disabled={disabled}/>
    }

  </div>
}

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
