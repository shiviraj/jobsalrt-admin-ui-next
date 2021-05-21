import React, {createRef} from 'react';
import {SnackbarProvider, useSnackbar} from 'notistack';
import {Close} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";

const useToast = () => {
  const {enqueueSnackbar} = useSnackbar();


  const warning = (message) => {
    enqueueSnackbar(message, {variant: "warning"});
  }

  const info = (message) => {
    enqueueSnackbar(message, {variant: "info", autoHideDuration: 5000});
  }

  const error = (message) => {
    enqueueSnackbar(message, {variant: "error"});
  }

  const success = (message) => {
    enqueueSnackbar(message, {variant: "success", autoHideDuration: 5000});
  }

  return {warning, info, error, success}

};

const ToastWrapper = ({children}) => {
  const toastRef = createRef()
  const onClickDismiss = (key) => () => {
    toastRef.current.closeSnackbar(key);
  }

  return <SnackbarProvider maxSnack={5} anchorOrigin={{horizontal: "right", vertical: "top"}} autoHideDuration={null}
                           ref={toastRef}
                           action={(key) => (<IconButton onClick={onClickDismiss(key)}><Close/></IconButton>)}
  >
    {children}
  </SnackbarProvider>
};

export {useToast}
export default ToastWrapper
