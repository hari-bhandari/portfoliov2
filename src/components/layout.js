import React from "react"
import PropTypes from "prop-types"
import Footer from "./Footer"
import Navigation from "./Navbar/Navbar"
import SEO from "./seo"
import styled, { ThemeProvider } from "styled-components"
import { theme, GlobalStyles } from "../styles"
import SideItemsRight from "./Side/SideItemsRight";
import SideItemsLeft from "./Side/SideItemsLeft";
const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`
const Layout = ({ children }) => {
  return (
    <main>
      <SEO lang={"en"} />
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <StyledContent>
          <Navigation />
          <SideItemsRight/>
          <SideItemsLeft/>
          <div id="content">
            {children}
            <Footer />
          </div>
        </StyledContent>
      </ThemeProvider>
    </main>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
