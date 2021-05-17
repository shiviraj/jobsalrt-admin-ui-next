import React, {useEffect, useState} from 'react';
import {fade, makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import store from "../../../store";

const useStyles = makeStyles((theme) => ({
  grow: {flexGrow: 1,},
  title: {display: 'none', [theme.breakpoints.up('sm')]: {display: 'block',},},
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {backgroundColor: fade(theme.palette.common.white, 0.25),},
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {marginLeft: theme.spacing(3), width: 'auto',},
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {color: 'inherit',},
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {width: '20ch',},
  }
}));

const Appbar = () => {
  const classes = useStyles();
  const [userName, setUserName] = useState("")

  const unsubscribe = store.subscribe(() => {
    const {user} = store.getState()
    const userName = user.data && user.data.name
    setUserName(userName)
  })

  useEffect(() => {
    userName && unsubscribe()
  }, [userName])

  return (<AppBar className={classes.grow}>
      <Toolbar>
        <Typography className={classes.title} variant="h6" noWrap>
          <b>Jobsalrt Admin &nbsp; | </b>
        </Typography>&nbsp; {userName}
        <div className={classes.grow}/>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon/>
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{'aria-label': 'search'}}
          />
        </div>
        <div className={classes.grow}/>
        <div className={classes.grow}/>
      </Toolbar>
    </AppBar>
  );
}


export default Appbar
