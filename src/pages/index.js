import React from "react"
import Layout from "../components/layout"
import Header from "../components/Header/Header";
import AboutMe from "../components/AboutMe/AboutMe";
import styled from "styled-components";
import Projects from "../components/projects/Projects";
import MiniProjects from "../components/projects/MiniProjects";
import Contact from "../components/contact/ContactForm";
import Clones from "../components/projects/Clones";
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
            <Clones/>
            <Contact/>
        </StyledMainContainer>
</Layout>
    )
}

export default IndexPage
