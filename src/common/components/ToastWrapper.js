import React, {createRef} from 'react';
import {SnackbarProvider, useSnackbar} from 'notistack';
import {Close} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  toast: {
    width: theme.spacing(48)
  }
}))

const useToast = () => {
  const {enqueueSnackbar} = useSnackbar();

  const warning = (message) => {
    enqueueSnackbar(message, {variant: "warning"});
  }

  const info = (message) => {
    enqueueSnackbar(message, {variant: "info"});
  }

  const error = (message) => {
    enqueueSnackbar(message, {variant: "error"});
  }

  const success = (message) => {
    enqueueSnackbar(message, {variant: "success"});
  }

  return {warning, info, error, success}

};

const ToastWrapper = ({children}) => {
  const toastRef = createRef()
  const classes = useStyles()
  const onClickDismiss = (key) => () => {
    toastRef.current.closeSnackbar(key);
  }

  return <SnackbarProvider maxSnack={5} anchorOrigin={{horizontal: "right", vertical: "top"}} autoHideDuration={5000}
                           ref={toastRef} aria-multiline={true} className={classes.toast}
                           action={(key) => (<IconButton onClick={onClickDismiss(key)}><Close/></IconButton>)}
  >
    {children}
  </SnackbarProvider>
};

export {useToast}
export default ToastWrapper
