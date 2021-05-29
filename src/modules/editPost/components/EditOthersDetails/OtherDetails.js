import React from "react";
import {Button, Divider, FilledInput} from "@material-ui/core";
import useStyles from "./useStyles";
import ObjectDetails from "../EditObject/ObjectDetails";

const OtherDetails = ({others, activeTab, updated}) => {
  const classes = useStyles()

  return <div className={classes.innerGrid}>
    {
      Object.keys(others).map((keyName, index) => {
        return (activeTab === index) &&
          <div key={keyName}>
            <div className={classes.deleteButtonContainer}>
              <Button className={classes.delete} variant="contained" disabled>
                Delete Object
              </Button>
            </div>
            <FilledInput className={classes.title} value={keyName} multiline fullWidth disabled/>
            <Divider className={classes.divider}/>
            <ObjectDetails currentObj={others[keyName]} updatedObj={updated[keyName] || {header: [], body: []}}/>
          </div>
      })
    }
  </div>
}

export default OtherDetails
