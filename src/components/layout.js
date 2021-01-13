
import React, {useEffect, useState} from "react"
import PropTypes from "prop-types"
import Footer from "./Footer";
import Navigation from "./Navbar/Navbar";
import SEO from "./seo";
import styled ,{ThemeProvider} from "styled-components";
import {theme,GlobalStyles} from "../styles";
import Loader from "./Loader/Loader";
const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
const Layout = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isLoading) {
            return;
        }
        if (window.location.hash) {
            const id = window.location.hash.substring(1); // location.hash without the '#'
            setTimeout(() => {
                const el = document.getElementById(id);
                if (el) {
                    el.scrollIntoView();
                    el.focus();
                }
            }, 0);
        }
    }, [isLoading]);


  return (
    <>
        <SEO lang={"en"}/>
        <div className="root">
            <ThemeProvider theme={theme}>
                <GlobalStyles/>
                {isLoading ? (
                    <Loader finishLoading={() => setIsLoading(false)} />
                ) : (
                    <StyledContent>
                        <Navigation/>
                        <div id="content">
                            {children}
                            <Footer />
                        </div>
                    </StyledContent>
                    )}
            </ThemeProvider>
        </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
