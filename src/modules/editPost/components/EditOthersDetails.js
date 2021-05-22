import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Divider, FilledInput, Grid, Tab, Tabs} from "@material-ui/core";
import EditObject from "./EditObject";
import {cloneObject} from "../../../utils/utils";
import API from "../../../API";
import {useToast} from "../../../common/components/ToastWrapper";
import SaveAndSubmitButtons from "./SaveAndSubmitButtons";


const useStyles = makeStyles(theme => ({
  root: {},
  innerGrid: {padding: theme.spacing(2)},
  right: {borderLeft: `1px solid ${theme.palette.grey[300]}`},
  header: {
    display: "flex",
    alignItems: "center",
  },
  addButton: {
    marginLeft: theme.spacing(4),
  },
  divider: {marginTop: theme.spacing(1)},
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


const OtherDetails = ({others, activeTab, setOthers, setActiveTab, updateOthers, handleSavePost, disabled}) => {
  const classes = useStyles()


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


  return <div className={classes.innerGrid}>
    {
      Object.keys(others).map((keyName, index) => {
        return (activeTab === index) &&
          <div key={keyName}>
            <div className={classes.deleteButtonContainer}>
              <Button className={classes.delete} variant="contained" onClick={() => deleteObject(keyName)}
                      disabled={disabled}>
                Delete Object
              </Button>
            </div>
            <FilledInput className={classes.title} value={keyName} multiline fullWidth disabled={disabled}
                         onChange={(e) => updateKey(keyName, e.target.value)}/>
            <Divider className={classes.divider}/>

            <EditObject keyName={keyName} post={others} savePost={(obj) => updateOthersObj(keyName, obj)}
                        updatePost={handleSavePost} disabled={disabled}/>
            <Divider className={classes.divider}/>
          </div>
      })
    }
  </div>
}

const EditOthersDetails = ({post, savePost, url, checkUpdate, updates}) => {
  const classes = useStyles()
  const toast = useToast()
  const [others, setOthers] = useState(cloneObject(post.others) || {})
  const [activeTab, setActiveTab] = useState(0)
  const [isUpdating, setIsUpdating] = useState(false)

  const updateOthers = () => setOthers({...others})

  const addNewObject = () => {
    others["New Object"] = {header: [], body: []}
    updateOthers()
  }


  const handleSavePost = () => savePost({others})

  const handleUpdatePost = () => {
    handleSavePost()
    setIsUpdating(true)
    API.post.updatePost(post, url)
      .then(() => toast.success("Successfully updated post!!"))
      .catch(() => toast.error("Failed to update post!!"))
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

    <Grid container>
      <Grid item xs={checkUpdate ? 6 : 12}>
        <OtherDetails others={others} activeTab={activeTab} setOthers={setOthers} updateOthers={updateOthers}
                      handleSavePost={handleSavePost} title="Current Post"/>
      </Grid>

      {checkUpdate && updates && <Grid item xs={6} className={classes.right}>
        <OtherDetails others={updates.others || {}} activeTab={activeTab} title="New Update" disabled/>
      </Grid>}

      <Grid item xs={12}>
        <Divider/>
        <SaveAndSubmitButtons loading={isUpdating} handleSave={handleSavePost} handleSubmit={handleUpdatePost}
                              fullWidth/>
      </Grid>
    </Grid>
  </div>
}

export default EditOthersDetails
