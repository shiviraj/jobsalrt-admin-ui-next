import React from "react";
import {Checkbox, FormControlLabel} from "@material-ui/core";

const FormCheckBox = ({label, value, onChange, checked, ...rest}) => {
  return (<FormControlLabel value={value} control={<Checkbox color="primary" checked={checked}
                                                             onChange={() => onChange(value)}{...rest}/>} label={label}
                            labelPlacement="end"/>)
}

export default FormCheckBox
