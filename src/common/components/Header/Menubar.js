import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import theme from "../../../theme/theme";
import {ListItem, ListItemText} from "@material-ui/core";
import Link from "next/link"
import {useRouter} from "next/router";

const useStyles = makeStyles({
  root: {
    marginTop: theme.spacing(8),
    backgroundColor: theme.palette.common.white,
    borderBottom: `1px solid ${theme.palette.primary.light}`,
    boxShadow: theme.shadows[4],
    display: "flex",
    justifyContent: "flex-start",
    "& > *": {
      width: theme.spacing(20),
      textAlign: "center"
    },
    "& > *:hover": {
      backgroundColor: theme.palette.primary.extraLight,
      color: theme.palette.common.black,
    }
  },
  active: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
    borderBottom: `3px solid ${theme.palette.primary.dark}`,
  },
});

const Menubar = () => {
  const classes = useStyles();
  const path = useRouter().pathname

  return (<div className={classes.root} id="back-to-top-anchor">
    <ListItem button className={path === "/" ? classes.active : ""}>
      <Link href="/">
        <ListItemText primary="HOME"/>
      </Link>
    </ListItem>
    <ListItem button className={path === "/posts" ? classes.active : ""}>
      <Link href="/posts">
        <ListItemText primary="POSTS"/>
      </Link>
    </ListItem>
  </div>);
}

export default Menubar
