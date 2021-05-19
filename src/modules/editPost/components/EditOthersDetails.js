import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Divider, FilledInput, Tab, Tabs} from "@material-ui/core";
import EditObject from "./EditObject";
import SaveAndSubmitButtons from "./SaveAndSubmitButtons";
import {cloneObject} from "../../../utils/utils";
import API from "../../../API";


const useStyles = makeStyles(theme => ({
  root: {
    // backgroundColor: theme.palette.common.white,
    // paddingTop: theme.spacing(2),
    // "& > *": {paddingLeft: theme.spacing(2), paddingRight: theme.spacing(2)}
  },
  header: {
    display: "flex",
    alignItems: "center",
  },
  addButton: {
    marginLeft: theme.spacing(4),
  },
  divider: {marginTop: theme.spacing(1), marginBottom: theme.spacing(1)},
  title: {
    fontSize: theme.spacing(3)
  },
  deleteButtonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: theme.spacing(2)
  },
  delete: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    }
  },
}));

const EditOthersDetails = ({post, savePost}) => {
  const classes = useStyles()
  const [others, setOthers] = useState(cloneObject(post.others) || {})
  const [activeTab, setActiveTab] = useState(0)
  const [isUpdating, setIsUpdating] = useState(false)

  const updateOthers = () => setOthers({...others})

  const updateOthersObj = (key, obj) => {
    setOthers({...others, ...obj})
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

  const addNewObject = () => {
    others["New Object"] = {header: [], body: []}
    updateOthers()
  }

  const handleSavePost = () => savePost({others})

  const handleUpdatePost = () => {
    handleSavePost()
    setIsUpdating(true)
    API.post.updatePost(post)
      .then(() => ({}))
      .catch(() => ({}))
      .then(() => setIsUpdating(false))

  }

  const handleTabChange = (e, value) => setActiveTab(value);

  return <div>
    <div className={classes.header}>
      <Tabs value={activeTab} indicatorColor="primary" textColor="primary" onChange={handleTabChange}>
        {Object.keys(others).map((key, index) => <Tab key={key} label={key}/>)}
      </Tabs>
      <Button color="primary" variant="contained" className={classes.addButton} onClick={addNewObject}>
        Add New Object
      </Button>
    </div>
    <Divider className={classes.divider}/>

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

            <EditObject keyName={keyName} post={others} savePost={(obj) => updateOthersObj(keyName, obj)}
                        updatePost={handleSavePost}/>
            <Divider className={classes.divider}/>
          </div>
      })
    }

    <SaveAndSubmitButtons loading={isUpdating} handleSave={handleSavePost} handleSubmit={handleUpdatePost} fullWidth/>

  </div>
}

export default EditOthersDetails
