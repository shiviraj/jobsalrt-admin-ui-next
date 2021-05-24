import React, {useEffect} from "react";
import {Provider} from "react-redux";
import store from "../store";
import {ThemeProvider} from "@material-ui/styles";
import theme from "../theme/theme";
import HeadTag from "../common/components/HeadTag";
import Layout from "../common/components/Layout";
import {shouldValidateUserFor} from "../config/routes";
import {Router} from "next/router";
import {validateUser} from "../modules/user/actions";
import {onRouteChange} from "../utils/routing";
import ToastWrapper from "../common/components/ToastWrapper";

const MyApp = ({Component, pageProps, ...rest}) => {
  useEffect(() => {
    Router.events.on('routeChangeComplete', onRouteChange)
  }, [])

  return <Provider store={store}>
    <HeadTag/>
    <ThemeProvider theme={theme}>
      <WithValidatedProfile {...rest}>
        <ToastWrapper>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ToastWrapper>
      </WithValidatedProfile>
    </ThemeProvider>
  </Provider>
}

const WithValidatedProfile = ({children, ...rest}) => {
  useEffect(() => {
    if (shouldValidateUserFor(Router.pathname || rest.router.pathname)) {
      store.dispatch(validateUser())
    }
  }, [])

  return children
};


export default MyApp
