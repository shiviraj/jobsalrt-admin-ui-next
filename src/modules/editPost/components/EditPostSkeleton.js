import React from "react";
import {Skeleton} from "@material-ui/lab";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    backgroundColor: theme.palette.grey[300]
  },
  postContainer: {
    width: '76%',
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(2),
  },
  optionsContainer: {
    width: '16%',
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(2),
  },
  skeletonContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
  },
  skeleton: {
    width: "100%",
    textAlign: "center",
    margin: theme.spacing(2),
    backgroundColor: theme.palette.grey[100],
  },
}));

const EditPostSkeleton = () => {
  const classes = useStyles()
  return <div className={classes.root}>
    <div className={classes.postContainer}>
      <div className={classes.skeletonContainer}>
        <Skeleton variant="rect" animation="wave" height={60} className={classes.skeleton}/>
      </div>
      <div className={classes.skeletonContainer}>
        <Skeleton variant="rect" animation="wave" height={400} className={classes.skeleton}/>
      </div>
      <div className={classes.skeletonContainer}>
        <Skeleton variant="rect" animation="wave" height={60} className={classes.skeleton}/>
      </div>
    </div>
    <div className={classes.optionsContainer}>
      <div className={classes.skeletonContainer}>
        <Skeleton variant="rect" animation="wave" height={560} className={classes.skeleton}/>
      </div>
    </div>
  </div>
};

export default EditPostSkeleton
