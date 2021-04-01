
import React from "react"
import PropTypes from "prop-types"
import Footer from "./Footer";
import Navigation from "./Navbar/Navbar";
import SEO from "./seo";
import styled ,{ThemeProvider} from "styled-components";
import {theme,GlobalStyles} from "../styles";

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
const Layout = ({ children }) => {
  return (
    <>
        <SEO lang={"en"}/>
        <div className="root">
            <ThemeProvider theme={theme}>
                <GlobalStyles/>
                    <StyledContent>
                        <Navigation/>
                        <div id="content">
                            {children}
                            <Footer />
                        </div>
                    </StyledContent>
            </ThemeProvider>
        </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
