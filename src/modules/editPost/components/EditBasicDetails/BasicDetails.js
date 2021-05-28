import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography} from "@material-ui/core";
import FormInput from "../../../../common/components/FormInput";
import React from "react";
import {findDiffKeys, isSameObject, keyTitleDetails} from "./utils";
import useStyles from "./useStyles";

const BasicDetails = ({currentDetails, updatedDetails, checkUpdate}) => {
  const isSame = isSameObject(currentDetails, updatedDetails)
  const diffKeys = findDiffKeys(currentDetails, updatedDetails)
  const classes = useStyles()
  return <div className={`${classes.innerGrid} ${checkUpdate ? classes.fullWidth : classes.halfWidth}`}>
    <Typography variant="h6" align="center" color={isSame ? "primary" : "error"}>New Update</Typography>
    <FormControl component="fieldset" required disabled>
      <FormLabel component="legend">Form Type</FormLabel>
      <RadioGroup row value={updatedDetails.formType}>
        <FormControlLabel value="ONLINE" control={<Radio color="primary" disabled/>} label="Online"/>
        <FormControlLabel value="OFFLINE" control={<Radio color="primary" disabled/>} label="Offline"/>
      </RadioGroup>
    </FormControl>
    {
      keyTitleDetails.map(obj => {
        return <FormInput {...obj} key={obj.label} value={updatedDetails[obj.key]} multiline={obj.type !== "date"}
                          error={diffKeys.includes(obj.key)}
                          disabled/>
      })
    }
    <FormInput label="Url" value={updatedDetails.url} required disabled/>
  </div>
}


export default BasicDetails
