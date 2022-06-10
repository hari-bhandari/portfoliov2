import React from "react";
import { Link } from "gatsby";
import PropTypes from "prop-types";
import styled from "styled-components";
import Layout from "../components/layout";
import mixins from "../styles/mixins";

const StyledTitle = styled.h1`
  color: var(--green);
  font-family: var(--font-mono);
  font-size: clamp(100px, 25vw, 200px);
  line-height: 1;
`;
const StyledSubtitle = styled.h2`
  font-size: clamp(30px, 5vw, 50px);
  font-weight: 400;
`;
const StyledHomeButton = styled(Link)`
  ${mixins.bigButton};
  margin-top: 40px;
`;
const NotFoundContainer = styled.div`
  padding: 15vh 0;
`;
const StyledMainContainer = styled.main`
  ${mixins.flexCenter};
  flex-direction: column;
  min-height: 50vh;
  background-color: var(--light-grey);
  color: var(--dark-grey);
  font-family: var(--font-mono);
  font-size: clamp(100px, 25vw, 200px);
  line-height: 1;
`;

const BlogPage = ({ location }) => {
  return (
    <Layout location={location} Title={"Blogs"}>
      <NotFoundContainer>

        <StyledMainContainer>
          <StyledTitle>Coming Soon</StyledTitle>
          <StyledSubtitle>
            This page is under construction.
          </StyledSubtitle>
          <StyledHomeButton to="/">Go Home</StyledHomeButton>
        </StyledMainContainer>
      </NotFoundContainer>

    </Layout>
  );
};

BlogPage.propTypes = {
  location: PropTypes.object.isRequired
};

export default BlogPage;