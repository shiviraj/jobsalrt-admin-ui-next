import React, {useRef, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {Typography} from "@material-ui/core";
import FormInput from "../../common/components/FormInput";
import ButtonWithLoader from "../../common/components/ButtonWithLoader";
import API from "../../API";
import {setStorage} from "../../utils/storage";
import {StorageKeys} from "../../constants/storage";
import {Alert} from "@material-ui/lab";
import {redirectTo} from "../../utils/routing";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    flexGrow: 1,
    minWidth: 300,
    transform: 'translateZ(0)',
    '@media all and (-ms-high-contrast: none)': {display: 'none',},
  },
  modal: {
    display: 'flex',
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: "flex",
    flexDirection: "column"
  },
  button: {marginTop: theme.spacing(1),},
  alert: {margin: theme.spacing(1, 0)}
}));

const Login = () => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [email, setEmail] = useState('');
  const [password, setPwd] = useState('');
  const rootRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    API.user.login({email, password})
      .then((data) => {
        setStorage(StorageKeys.AUTH, data)
        redirectTo("/")
      })
      .catch(() => setError("Invalid Credentials, Try again!!"))
      .then(() => setLoading(false))
  };

  return (<div className={classes.root} ref={rootRef}>
    <Modal
      open
      className={classes.modal}
      container={() => rootRef.current}
    >
      <form className={classes.paper} onSubmit={handleSubmit}>
        <Typography variant="h5">Log In</Typography>
        {error && <Alert severity="error" className={classes.alert}>{error}</Alert>}
        <FormInput type="email" label="Email" onChange={setEmail} autoFocus required/>
        <FormInput type="password" label="Password" onChange={setPwd} required/>
        <ButtonWithLoader loading={loading} variant="contained" size="large" color="primary"
                          className={classes.button} fullWidth
                          disabled={email === "" || password === ""} type="submit">Log In</ButtonWithLoader>
      </form>
    </Modal>
  </div>)
}

export default Login;
