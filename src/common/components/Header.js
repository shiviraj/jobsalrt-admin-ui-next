import React from 'react'
import Appbar from "./Header/Appbar";
import Menubar from "./Header/Menubar";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {position: "fixed"}
}));

const Header = () => {
  const classes = useStyles()
  return <><Appbar className={classes.root}/><Menubar/></>
}

export default Header
