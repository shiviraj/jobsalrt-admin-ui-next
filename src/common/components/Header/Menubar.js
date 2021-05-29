import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import theme from "../../../theme/theme";
import Link from "next/link"
import {useRouter} from "next/router";
import {Button} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    marginTop: theme.spacing(6),
    backgroundColor: theme.palette.common.white,
    borderBottom: `1px solid ${theme.palette.primary.light}`,
    boxShadow: theme.shadows[4],
    display: "flex",
    justifyContent: "flex-start",
    "& > *": {
      width: theme.spacing(20),
      textAlign: "center",
      borderRadius: 0
    },
    "& > *:hover": {
      backgroundColor: theme.palette.primary.extraLight,
      color: theme.palette.common.black,
    }
  },
  active: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
    borderBottom: `2px solid ${theme.palette.primary.dark}`,
  },
});

const NavLink = ({path, text}) => {
  const classes = useStyles();
  const pathName = useRouter().pathname
  return <Link href={path}>
    <Button className={path === pathName ? classes.active : ""}>{text}</Button>
  </Link>
}

const Menubar = () => {
  const classes = useStyles();
  return (<div className={classes.root} id="back-to-top-anchor">
    <NavLink path="/" text="HOME"/>
    <NavLink path="/posts" text="POSTS"/>
  </div>);
}

export default Menubar
