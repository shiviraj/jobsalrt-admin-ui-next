import useStyles from "./useStyles";
import {Button, Divider, FilledInput} from "@material-ui/core";
import React from "react";
import EditableObjectDetails from "../EditObject/EditableObjectDetails";

const EditableOtherDetails = ({others, activeTab, setOthers, setActiveTab, updateOthers, checkUpdate}) => {
  const classes = useStyles()

  const updateOthersObj = (key, obj) => {
    setOthers({...others, [key]: obj})
  }

  const updateKey = (oldKey, newKey) => {
    others[newKey] = others[oldKey]
    deleteObject(oldKey)
  }

  const deleteObject = (key) => {
    setActiveTab(0)
    delete others[key]
    updateOthers()
  }

  return <div className={classes.innerGrid}>
    {
      Object.keys(others).map((keyName, index) => {
        return (activeTab === index) &&
          <div key={keyName}>
            <div className={classes.deleteButtonContainer}>
              <Button className={classes.delete} variant="contained" onClick={() => deleteObject(keyName)}>
                Delete Object
              </Button>
            </div>
            <FilledInput className={classes.title} value={keyName} multiline fullWidth
                         onChange={(e) => updateKey(keyName, e.target.value)}/>
            <Divider className={classes.divider}/>

            <EditableObjectDetails obj={others[keyName]} setObj={(obj) => updateOthersObj(keyName, obj)}
                                   checkUpdate={checkUpdate}/>
          </div>
      })
    }
  </div>
}

export default EditableOtherDetails
