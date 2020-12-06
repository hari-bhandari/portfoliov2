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

       <Layout>
            {isLoading && isHome ? (
                <Loader finishLoading={() => setIsLoading(false)} />
            ) : (
                <Fragment>
                    <GlobalStyle/>


                    <Navigation/>
                    <StyledMainContainer className={"fillHeight"}>
                    <Header data={{
                        "intro": "Hi, I'm",
                        "name": "Hari Bhandari,",
                        "copy": "I'm a self taught Full Stack Developer at",
                        "company": "Hari's T.",
                        "companyURL": "https://haribhandari.me",
                        "subtitle": "Software Developer",
                        "subCopy": "I'm currently focused on using React,next.js and Gatsby to create extremely fast and responsive websites."
                    }}/>
                    <AboutMe/>
                    <SEO title="Home"/>
                   <Projects/>
                   <MiniProjects/>
                   <Contact/>
                    </StyledMainContainer>

                </Fragment>)}
        </Layout>
    )
}

export default IndexPage
