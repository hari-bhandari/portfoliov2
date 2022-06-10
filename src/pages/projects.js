import React from "react";
import { StyledMainContainer } from "./index";
import Layout from "../components/layout";
import { StyledHomeButton } from "./404";
import mixins from "../styles/mixins";
import styled from "styled-components";
import Projects from "../components/projects/Projects";
import Clones from "../components/projects/Clones";
import MiniProjects from "../components/projects/MiniProjects";

export default function ProjectsPage() {
  //create a styled component to center content horizontally
  const StyledHomeButtonContainer = styled.div`
    ${mixins.flexCenter};
    margin-bottom: 40px;
  `;
  // scroll to About section
  return (
    <Layout Title={"Projects"}>
      <div style={{ marginTop: "100px" }}>

      <StyledMainContainer className="fillHeight">
        <Projects />
        <div>
          <Clones />
        </div>
        <MiniProjects />
        {/*  create a button to go back home*/}
        <StyledHomeButtonContainer>
          <StyledHomeButton to="/">See Full Portfolio</StyledHomeButton>
        </StyledHomeButtonContainer>
      </StyledMainContainer>

      </div>
    </Layout>
  );
};

