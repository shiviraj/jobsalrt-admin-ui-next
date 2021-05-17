import {Provider} from "react-redux";
import store from "../store";
import {ThemeProvider} from "@material-ui/styles";
import theme from "../theme/theme";
import HeadTag from "../common/components/HeadTag";
import Layout from "../common/components/Layout";

const MyApp = ({Component, pageProps}) => {
  return <Provider store={store}>
    <HeadTag/>
    <ThemeProvider theme={theme}>
      <div id="modal-portal"/>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  </Provider>
}

export default MyApp
