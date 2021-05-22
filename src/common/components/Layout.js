import React from 'react'
import Header from "./Header";
import {useRouter} from "next/router";
import Footer from "./Footer";

const Layout = ({children}) => {
  const router = useRouter()
  return (
    <React.Fragment>
      {router.pathname !== "/login" && <Header/>}
      {/*{displayNavigation && device === devices.DESKTOP && <DesktopNav/>}*/}
      <div>{children}</div>
      <Footer/>
    </React.Fragment>
  )
};

export default Layout
