import React, {Fragment, useEffect, useState} from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Loader from "../components/Loader/Loader";
import Navigation from "../components/Navbar/Navbar";
import GlobalStyle from "../styles/GlobalStyle";
import Header from "../components/Header/Header";
import AboutMe from "../components/AboutMe/AboutMe";
import styled from "styled-components";
import Projects from "../components/projects/Projects";
import MiniProjects from "../components/projects/MiniProjects";
import Contact from "../components/contact/ContactForm";
import Footer from "../components/Footer";
const StyledMainContainer = styled.main`
  counter-reset: section;
`;

const IndexPage = () => {
  //   const data = useStaticQuery(graphql`
  //   query {
  //     headerJson {
  //     intro
  //     name
  //     company
  //     companyURL
  //     subtitle
  //     copy
  //     subCopy
  //   }
  //   }
  // `)
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

            {isLoading && isHome ? (
                <Loader finishLoading={() => setIsLoading(false)} />
            ) : (
                <Layout>

                    <GlobalStyle/>

                    <SEO title="Home"/>
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
