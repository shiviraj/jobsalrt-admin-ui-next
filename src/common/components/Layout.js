import React from 'react'
import Header from "./Header";
import store from "../../store";

const Layout = ({children}) => {
  const user = store.getState().user
  return (
    <React.Fragment>
      {user && <Header/>}
      {/*{displayNavigation && device === devices.DESKTOP && <DesktopNav/>}*/}
      <div>{children}</div>
    </React.Fragment>
  )
};

export default Layout
