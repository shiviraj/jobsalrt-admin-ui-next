import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography} from "@material-ui/core";
import FormInput from "../../../../common/components/FormInput";
import React from "react";
import {keyTitleDetails} from "./utils";
import useStyles from "./useStyles";

const EditableBasicDetails = ({details, handleFormTypeChange, updateDetails, urlAvailable, checkUpdate}) => {
  const classes = useStyles()
  return <div className={`${classes.innerGrid} ${checkUpdate ? classes.fullWidth : classes.halfWidth}`}>
    {checkUpdate && <Typography variant="h6" align="center" color="primary">Current Post</Typography>}
    <FormControl component="fieldset" required>
      <FormLabel component="legend">Form Type</FormLabel>
      <RadioGroup row value={details.formType} onChange={handleFormTypeChange}>
        <FormControlLabel value="ONLINE" control={<Radio color="primary"/>} label="Online"/>
        <FormControlLabel value="OFFLINE" control={<Radio color="primary"/>} label="Offline"/>
      </RadioGroup>
    </FormControl>
    {
      keyTitleDetails.map(obj => {
        return <FormInput {...obj} key={obj.label} value={details[obj.key]} multiline={obj.type !== "date"}
                          onChange={(value) => updateDetails(obj.key, value)}/>
      })
    }
    <FormInput label="Url" value={details.url.split(" ").join("-").toLowerCase()}
               onChange={(value) => updateDetails("url", value.split(" ").join("-").toLowerCase())} required
               error={!urlAvailable}/>
  </div>
}


export default EditableBasicDetails
