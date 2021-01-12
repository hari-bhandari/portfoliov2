import React, {Fragment, useEffect, useState} from "react"
import Loader from "../components/Loader/Loader";
import Layout from "../components/layout"
import SEO from "../components/seo"
import GlobalStyle from "../styles/GlobalStyle";
import Header from "../components/Header/Header";
import AboutMe from "../components/AboutMe/AboutMe";
import styled from "styled-components";
import Projects from "../components/projects/Projects";
import MiniProjects from "../components/projects/MiniProjects";
import Contact from "../components/contact/ContactForm";
const StyledMainContainer = styled.main`
  counter-reset: section;
`;

const IndexPage = () => {

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
        <Fragment>
            <SEO title="Portfolio"/>
            <GlobalStyle/>
            {isLoading ? (
                <Loader finishLoading={() => setIsLoading(false)} />
            ) : (
                <Layout>
                    <StyledMainContainer className={"fillHeight"}>
                    <Header/>
                    <AboutMe/>
                   <Projects/>
                   <MiniProjects/>
                   <Contact/>
                    </StyledMainContainer>
                </Layout>
                )}

        </Fragment>
    )
}

export default IndexPage
