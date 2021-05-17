import React from "react";
import {Typography} from "@material-ui/core";
import {Skeleton} from "@material-ui/lab";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  skeleton: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.grey[100],
  },
  circleSkeleton: {
    display: "flex",
    justifyContent: 'center'
  },
}));

const PostSkeleton = () => {
  const classes = useStyles()
  return <div className={classes.skeleton}>
    <Typography variant="h4"><Skeleton animation="wave" variant="text"/></Typography>
    <div className={classes.circleSkeleton}>
      <Skeleton animation="wave" variant="circle" width={60} height={60}/>
    </div>
    <Skeleton animation="wave" variant="rect" width={280} height={180}/>
  </div>
};

export default PostSkeleton
