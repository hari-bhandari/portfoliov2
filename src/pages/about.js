import React  from "react";
import { StyledMainContainer } from "./index";
import Layout from "../components/layout";
import AboutMe from "../components/AboutMe/AboutMe";
import { StyledHomeButton } from "./404";
import mixins from "../styles/mixins";
import styled from "styled-components";
export default function AboutPage(){
  //create a styled component to center content horizontally
  const StyledHomeButtonContainer = styled.div`
    ${mixins.flexCenter};
  margin-bottom: 40px;
  `;
  // scroll to About section
  return (
    <Layout Title={"About"}>
      <StyledMainContainer className="fillHeight">
        <AboutMe />
      {/*  create a button to go back home*/}
        <StyledHomeButtonContainer>
        <StyledHomeButton to="/">See Full Portfolio</StyledHomeButton>
        </StyledHomeButtonContainer>
      </StyledMainContainer>
    </Layout>
  );
};

