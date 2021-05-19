import React from "react";
import {Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ButtonWithLoader from "../../../common/components/ButtonWithLoader";

const useStyles = makeStyles(theme => ({
  buttonContainer: {
    display: "flex", justifyContent: "center",
  },
  submitButton: {
    margin: theme.spacing(2)
  }
}))

const SaveAndSubmitButtons = ({handleSave, handleSubmit, loading, ...rest}) => {
  const classes = useStyles()
  return <div className={classes.buttonContainer}>
    <Button size="large" color="primary" variant="contained" onClick={handleSave} {...rest}
            className={classes.submitButton}>Save</Button>
    <ButtonWithLoader loading={loading} size="large" color="primary" variant="contained"
                      onClick={handleSubmit} {...rest}
                      className={classes.submitButton}>Update</ButtonWithLoader>
  </div>
}

export default SaveAndSubmitButtons
