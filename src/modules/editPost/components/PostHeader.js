import React from "react";
import {Button, FormControlLabel, makeStyles, Switch, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  titleContainer: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: 'space-between',
    margin: theme.spacing(0, 1)
  },
  toggle: {marginLeft: theme.spacing(2)},
}));

const PostHeader = ({active, rawPost, setRawPost, post, checked, handleCheckUpdate}) => {
  const classes = useStyles()

  return <div className={classes.titleContainer}>
    <div className={classes.titleContainer}>
      <Typography variant="h5">{active.name}</Typography>
      <Button variant="contained" color="primary" className={classes.toggle} onClick={() => setRawPost(!rawPost)}>
        {rawPost ? "Edit as Text" : "Edit as json"}
      </Button>
    </div>
    <div className={classes.titleContainer}>
      {post.isUpdateAvailable && <FormControlLabel
        value="update"
        control={<Switch color="primary" checked={checked} onChange={handleCheckUpdate}/>}
        label="Check Updates"
        labelPlacement="end"
      />}
      <Button variant="contained" color="primary" component="a" href={post.source} target="_blank">View Post
        Source</Button>
    </div>
  </div>
}

export default PostHeader
