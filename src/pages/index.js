import Loader from "../components/Loader/Loader";
import React, {Fragment, useEffect, useState} from "react"

import GlobalStyle from "../styles/GlobalStyle";
import Layout from "../components/layout"
import SEO from "../components/seo"
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

    return (
        <Layout >
        <StyledMainContainer className="fillHeight">
            <Header/>
            <AboutMe/>
            <Projects/>
            <MiniProjects/>
            <Contact/>
        </StyledMainContainer>
</Layout>
    )
}

export default IndexPage
