import React from "react"
import GlobalStyle from "../styles/GlobalStyle"
import Nav from "./Nav"
import Footer from "./Footer"
import { useRevealOnScroll } from "../hooks/motion"

const Layout = ({ children, location }) => {
  const pathname = location ? location.pathname : ""
  useRevealOnScroll(pathname)

  return (
    <>
      <GlobalStyle />
      <Nav pathname={pathname} />
      <main id="main" tabIndex={-1} style={{ outline: "none" }}>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout
