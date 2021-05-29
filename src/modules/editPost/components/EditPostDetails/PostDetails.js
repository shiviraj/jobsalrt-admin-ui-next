import React, {useState} from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  Typography
} from "@material-ui/core";
import FormInput from "../../../../common/components/FormInput";
import useStyles from "./useStyles";
import {states} from "./utils";
import ArrayDetails from "../EditArray/ArrayDetails";

const PostDetails = ({activeTab, localPost, updateLocalPost, post, title, disabled, checkUpdate, updates}) => {
  const classes = useStyles()
  const [failures] = useState({failures: post.failures} || {})

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
      <FormInput label="Total Views" value={localPost.totalViews.toString()} disabled/>
      <FormInput label="Created At" value={localPost.createdAt.split("T")[0]} disabled/>
      <FormInput label="Last Update on" value={localPost.postUpdateDate.split("T")[0]} disabled/>
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
      <ArrayDetails currentList={post.failures} updatedList={post.failures} disabledTitle/>
    }

  </div>
}

export default PostDetails
