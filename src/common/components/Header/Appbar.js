import React, {useEffect, useState} from 'react';
import {fade, makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import store from "../../../store";
import {useRouter} from "next/router";
import {setSearch} from "../../../modules/posts/actions";

const useStyles = makeStyles((theme) => ({
  root: {margin: theme.spacing(-1, 0), height: theme.spacing(7)},
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
  const [searchText, setSearchText] = useState("")
  const router = useRouter()

  const unsubscribe = store.subscribe(() => {
    const {user} = store.getState()
    const userName = user.data && user.data.name
    setUserName(userName)
  })

  const handleChange = (event) => {
    const value = event.target.value
    setSearchText(value)
    if (router.pathname !== "/posts") router.push("/posts").then()
    store.dispatch(setSearch(value))
  }

  useEffect(() => {
    userName && unsubscribe()
  }, [userName])

  return (<AppBar className={classes.root}>
      <Toolbar>
        <Typography className={classes.title} variant="h6" noWrap>
          <b>Jobsalrt Admin &nbsp; | </b> &nbsp; {userName}
        </Typography>
        <div className={classes.grow}/>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon/>
          </div>
          <InputBase
            placeholder="Search…"
            onChange={handleChange}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            value={searchText}
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
