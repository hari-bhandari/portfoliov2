import React from "react"
import Layout from "../components/layout"
import Header from "../components/Header/Header"
import styled from "styled-components"
import AboutMe from "../components/AboutMe/AboutMe";
import Projects from "../components/projects/Projects"
import Contact from "../components/contact/ContactForm"
import MiniProjects from "../components/projects/MiniProjects";
import Clones from "../components/projects/Clones"
const StyledMainContainer = styled.main`
  counter-reset: section;
`

const IndexPage = () => {
  return (
    <Layout>
      <StyledMainContainer className="fillHeight">
        <Header />
        <AboutMe />

        <Projects />
        <div>
          <Clones />
        </div>
        <MiniProjects />
        <Contact />
      </StyledMainContainer>
    </Layout>
  )
}

export default IndexPage
