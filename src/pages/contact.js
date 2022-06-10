import React from "react";
import { StyledMainContainer } from "./index";
import Layout from "../components/layout";
import mixins from "../styles/mixins";
import styled from "styled-components";
import Contact from "../components/contact/ContactForm";
export const StyledHomeButtonContainer = styled.div`
    ${mixins.flexCenter};
    margin-bottom: 40px;
  `;
export default function ProjectsPage() {
  //create a styled component to center content horizontally

  // scroll to About section
  return (
    <Layout Title={"Contact Me"} removeNavbar={true }>

        <StyledMainContainer className="fillHeight">
          <Contact self={true}/>
        </StyledMainContainer>

    </Layout>
  );
};

