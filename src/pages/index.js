import React, {Fragment, useEffect, useState} from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Loader from "../components/Loader/Loader";
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

    const isHome =true;
    const [isLoading, setIsLoading] = useState(isHome);

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

            {isLoading && isHome ? (

                <Loader finishLoading={() => setIsLoading(false)} />
            ) : (
                <Layout>
                    <GlobalStyle/>

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
