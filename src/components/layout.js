/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Footer from "./Footer";
import Navigation from "./Navbar/Navbar";

const Layout = ({ children }) => {


  return (
    <>
        <Navigation/>

      <div

      >
        <main>{children}</main>
      </div>
        <Footer/>

    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
