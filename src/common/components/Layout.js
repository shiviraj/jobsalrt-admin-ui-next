import React from 'react'
// import Header from './Header'

const Layout = ({children}) => {

  return (
    <React.Fragment>
      {/*<Header/>*/}
      {/*{displayNavigation && device === devices.DESKTOP && <DesktopNav/>}*/}
      <div>{children}</div>
    </React.Fragment>
  )
};

export default Layout
